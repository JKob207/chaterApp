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
                    alreadyConversation ? <button>OK</button>
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