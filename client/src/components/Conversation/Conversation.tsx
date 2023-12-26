import { useEffect, useState } from "react";
import { ConversationType, User } from "../../types";
import { getUserById } from "../../services/usersAPI";

type ConversationProps = {
    conversation: ConversationType;
    currentUser: User | null;
}

export default function Conversation({conversation, currentUser}: ConversationProps)
{
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(!currentUser) return;
        const friendId = conversation.members.find(m => m !== currentUser._id);

        const getContact = async () => {
            try {
                if(!friendId) throw new Error("No friend user id!");
                console.log(friendId);
                const res = await getUserById(friendId);
                if(res !== null) setUser(res);
            } catch (error) {
                console.log(error);
            }
        }
        getContact();
    }, [currentUser, conversation])

    return (
        <div className="contact flex flex-row items-center justify-around p-1 mb-5 bg-white drop-shadow-lg rounded-md">
            <img src={user?.avatar} className="rounded-full w-[45px] h-[45px]" alt="contact-avatar" />
            <p>{user?.login}</p>
            <div className="flex flex-col items-center">
                <p className="font-light text-sm">1 min</p>
                <p className="notofications text-sm	font-semibold bg-emerald-600 text-white rounded-full h-6 w-6 text-center mt-1">2</p>
            </div>
        </div>
    )
}