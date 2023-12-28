import { useEffect, useState } from "react";
import { ConversationType, User } from "../../types"
import { getUserById } from "../../services/usersAPI";

type CurrentContactInfoProps = {
    conversation: ConversationType;
    currentUser: User | null;
    userOnlineData: {userId: string; socketId: string;}[];
}

export default function CurrentContactInfo({conversation, currentUser, userOnlineData}: CurrentContactInfoProps)
{
    const [user, setUser] = useState<User | null>(null);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if(!currentUser) return;
        const friendId = conversation.members.find(m => m !== currentUser._id);
        const online = userOnlineData.find(u => u.userId === friendId);
        online ? setIsOnline(true) : setIsOnline(false);

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
    }, [currentUser, conversation, userOnlineData])

    return (
        <div className="flex items-center">
            <img src={user?.avatar} className="rounded-full w-[70px] h-[70px]" alt="current contact avatar" />
            <div className="current-contact-info flex flex-col ml-4">
                <p className="text-2xl">{user?.login}</p>
                <p className="font-light text-sm text-gray-600">
                    {
                        isOnline ? (
                            <span>online <span className="h-2 w-2 bg-emerald-300 inline-block rounded-full"> </span></span>
                        ) : (
                            <span>offline <span className="h-2 w-2 bg-red-300 inline-block rounded-full"> </span></span>
                        )
                    }
                    
                </p>
            </div>
        </div>
    )
}