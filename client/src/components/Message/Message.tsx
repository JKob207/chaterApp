import moment from "moment";
import { MessagesType } from "../../types";

type MessageProps = {
    message: MessagesType;
    own?: boolean;
}

export default function Message({message, own}: MessageProps)
{
    return (
        <div className={`message flex flex-col mt-5 ${own ? "items-end mr-4" : ""}`}>
            <div className="messageTop flex">
                <img 
                    className="messageImg w-8 h-8 rounded-full object-cover mr-3"
                    src="https://placehold.co/32"
                    alt="message image"
                />
                <p className={`messageText p-3 rounded-2xl ${own ? "bg-emerald-600 text-white" : "bg-gray-100 text-black"} w-full max-w-[480px]`}>
                    {message.text}
                </p>
            </div>
            <div className="messageBottom text-xs mt-2.5">
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    )
}