import { useEffect, useState } from "react";
import { checkIfTwoUsersAlreadyHaveConversation } from "../../services/communicationAPI";

export default function ContactBookUser(props: ContactBookUserProps)
{
    const [alreadyConversation, setAlreadyConversation] = useState(false);
    
    useEffect(() => {
        const checkIfAlreadyConversation = async () => {
            try {
                const res = await checkIfTwoUsersAlreadyHaveConversation(props?.senderId, props?._id);
                if(res === null) throw new Error("No response!");
                setAlreadyConversation(Boolean(res));
            } catch (error) {
                console.log(error);
            }
        }

        checkIfAlreadyConversation();
    }, []);

    return (
        <div key={props._id} className="p-1 mb-5 flex items-center w-full justify-between">
            <div className="flex items-center">
                <img src={props.avatar} className="rounded-full w-[45px] h-[45px]" alt="contact-avatar" />
                <p className="ml-4">{props.login}</p>
            </div>
            <div>
                {
                    alreadyConversation ? 
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 50 50">
                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                        </svg>
                    </button>
                    : 
                    <button onClick={() => props._id && props.addConversation(props._id)}>
                        <svg enableBackground="new 0 0 512 512" height="20px" width="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z"/>
                        </svg>
                    </button>
                }
                
            </div>
        </div>
    )
};

type ContactBookUserProps = {
    _id: string | undefined,
    senderId: string | undefined,
    avatar?: string,
    login: string,
    addConversation: (id: string) => void,
};