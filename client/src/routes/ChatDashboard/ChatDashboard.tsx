import { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { userContext } from "../../components/AuthRequired/AuthRequired";
import { ConversationType, MessagesType } from "../../types";
import { getConversations, getMessages, postMessage } from "../../services/communicationAPI";
import CurrentContactInfo from "../../components/CurrentContactInfo/CurrentContactInfo";
import { Socket, io } from "socket.io-client";

export default function ChatDashboard()
{
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const [currentChat, setCurrentChat] = useState<ConversationType | null>(null);
    const [messages, setMessages] = useState<MessagesType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState<MessagesType | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{userId: string; socketId: string;}[]>([]);
    const socket = useRef<Socket>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [filtered, setFiltered] = useState('');
    const user = useContext(userContext);

    useEffect(() => {
        socket.current = io("ws://localhost:3001");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if(socket.current)
        {
            socket?.current.emit("addUser", user?._id);
            socket?.current.on("getUsers", users => {
                setOnlineUsers(users);
            });
        }
    }, [user])

    useEffect(() => {
        const getConversationsFromAPI = async () => {
            try {
                if(!user?._id) throw new Error("No user id set!");
                const conversationsResponse = await getConversations(user._id);
                if(!conversationsResponse?.data) throw new Error("No data in response object!");
                setConversations(conversationsResponse?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversationsFromAPI();
    }, [user?._id])

    useEffect(() => {
        const getMessagesFromAPI = async () => {
            try {
                if(!currentChat?._id) throw new Error("No current conversation id set!");
                const messagesResponse = await getMessages(currentChat?._id);
                if(!messagesResponse?.data) throw new Error("No data in response object!");
                setMessages(messagesResponse?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessagesFromAPI();
    }, [currentChat])

    useEffect(() => {
        if(scrollRef.current)
        {
            scrollRef?.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        e.preventDefault();
        try {
            if(!currentChat?._id || !user?._id) throw new Error("Missing parts of message object!");
            
            const message: MessagesType = {
                conversationId: currentChat?._id,
                sender: user?._id,
                text: newMessage
            };

            const receiverId = currentChat.members.find(member => member !== user._id);

            socket.current?.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                text: newMessage
            });

            const res = await postMessage(message);
            if(res)
            {
                setMessages(prevMessages => [...prevMessages, message]);
                setNewMessage("");
            }else{
                console.log("Error with sending message!");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row mt-2 ml-8">
            <aside className="basis-1/5">
                <div>
                    <h2 className="text-3xl font-bold">Chat</h2>
                    <div className="mt-5">
                        <label className="relative block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                                <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
                            </svg>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                onChange={(e) => setFiltered(e.target.value)}
                                placeholder="Search"
                                className="form-input appearance-none block w-full pl-7 border-b-2 border-gray-600 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                </div>
                <div className="chat-list my-5 mx-2">
                    {
                        conversations.map((c) => (
                            <div key={c._id} onClick={() => setCurrentChat(c)} className="cursor-pointer">
                                <Conversation conversation={c} currentUser={user ? user : null} isActive={currentChat?._id === c._id} filtered={filtered} />
                            </div>
                        ))
                    }
                </div>
            </aside>
            <div className="ml-8 w-3/4">
                {
                    currentChat ?
                    <>
                        <CurrentContactInfo conversation={currentChat} currentUser={user ? user : null} userOnlineData={onlineUsers} />
                        <div className="mt-8">
                            <div className="MessageBoxWrapper">
                                <div className="message-box h-[66vh] overflow-y-scroll">
                                    {messages.map((m) => (
                                        <div key={m._id} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user?._id} />
                                        </div>                                    ))}
                                </div>
                                <div className="message-input">
                                    <form className="flex flex-row items-center">
                                        <input
                                            type="text"
                                            name="typeMessage"
                                            id="typeMessage"
                                            placeholder="Type a message..."
                                            className="form-input appearance-none block w-full border-0 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        />
                                        <button 
                                            className="bg-emerald-600 rounded-full p-1.5"
                                            onClick={handleSubmit}
                                        >
                                            <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 491.022 491.022">
                                                <g><g><path d="M490.916,13.991c-0.213-1.173-0.64-2.347-1.28-3.307c-0.107-0.213-0.213-0.533-0.32-0.747
                                                        c-0.107-0.213-0.32-0.32-0.533-0.533c-0.427-0.533-0.96-1.067-1.493-1.493c-0.427-0.32-0.853-0.64-1.28-0.96
                                                        c-0.213-0.107-0.32-0.32-0.533-0.427c-0.32-0.107-0.747-0.32-1.173-0.427c-0.533-0.213-1.067-0.427-1.6-0.533
                                                        c-0.64-0.107-1.28-0.213-1.92-0.213c-0.533,0-1.067,0-1.6,0c-0.747,0.107-1.493,0.32-2.133,0.533
                                                        c-0.32,0.107-0.747,0.107-1.067,0.213L6.436,209.085c-5.44,2.347-7.893,8.64-5.547,14.08c1.067,2.347,2.88,4.373,5.227,5.44
                                                        l175.36,82.453v163.947c0,5.867,4.8,10.667,10.667,10.667c3.733,0,7.147-1.92,9.067-5.12l74.133-120.533l114.56,60.373
                                                        c5.227,2.773,11.627,0.747,14.4-4.48c0.427-0.853,0.747-1.813,0.96-2.667l85.547-394.987c0-0.213,0-0.427,0-0.64
                                                        c0.107-0.64,0.107-1.173,0.213-1.707C491.022,15.271,491.022,14.631,490.916,13.991z M190.009,291.324L36.836,219.218
                                                        L433.209,48.124L190.009,291.324z M202.809,437.138V321.831l53.653,28.267L202.809,437.138z M387.449,394.898l-100.8-53.013
                                                        l-18.133-11.2l-0.747,1.28l-57.707-30.4L462.116,49.298L387.449,394.898z"/></g></g>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                    : <span className="text-5xl	absolute top-1/2 text-gray-100 cursor-default">Open a conversation to start a chat...</span>
                }
            </div>
        </div>
    )
}