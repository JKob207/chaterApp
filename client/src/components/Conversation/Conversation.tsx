import { useEffect, useState } from "react";
import { ConversationType, User } from "../../types";
import { getUserById } from "../../services/usersAPI";

export default function Conversation({conversation, currentUser, isActive, filtered}: ConversationProps)
{
    const [user, setUser] = useState<User | null>(null);
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        if(!currentUser) return;
        const friendId = conversation.members.find(m => m !== currentUser._id);

        const getContact = async () => {
            try {
                if(!friendId) throw new Error("No friend user id!");
                const res = await getUserById(friendId);
                if(res !== null) setUser(res);
            } catch (error) {
                console.log(error);
            }
        }
        getContact();
    }, [currentUser, conversation]);

    useEffect(() => {
        const isDisplayed = user && user?.login.toLowerCase().includes(filtered.toLowerCase());
        if(isDisplayed !== null) setDisplay(isDisplayed);
    }, [filtered]);

    return (
        <>
        {
            display ?
            <div className={`contact flex flex-row items-center justify-start p-1 mb-5 bg-white ${isActive ? "drop-shadow-lg rounded-md" : ""}`}>
                <img src={user?.avatar} className="rounded-full w-[45px] h-[45px] mr-2" alt="contact-avatar" />
                <p>{user?.login}</p>
            </div>
            :
            null
        }
        </>
    )
};

type ConversationProps = {
    conversation: ConversationType;
    currentUser: User | null;
    isActive: boolean;
    filtered: string;
};