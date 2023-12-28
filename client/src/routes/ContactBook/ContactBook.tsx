import { useContext, useEffect, useState } from "react"
import { User } from "../../types";
import { listAllUsers } from "../../services/usersAPI";
import { userContext } from "../../components/AuthRequired/AuthRequired";
import { postConversation } from "../../services/communicationAPI";

export default function ContactBook()
{
    const user = useContext(userContext);
    const [login, setLogin] = useState("");
    const [userList, setUserList] = useState<User[] | null>(null);
    const [filteredUserList, setFilteredUserList] = useState<User[] | null>(null);

    useEffect(() => {
        const getAllUsersList = async () => {
            try {
                const res = await listAllUsers();
                if(!res) throw new Error("User list no response!");
                setUserList(res);
            } catch (error) {
                console.log(error);
            }
        };

        getAllUsersList();
    }, [])

    useEffect(() => {
        const newUserList = userList?.filter((user) => user.login.toLowerCase().includes(login.toLowerCase()));
        newUserList && setFilteredUserList(newUserList);
    }, [login])

    async function addConversation(contactId: string)
    {
        try {
            if(!contactId || !user?._id) throw new Error("Id missing!");
            const newConversation = {
                senderId: user._id,
                receiverId: contactId
            };
            const res = await postConversation(newConversation);
            if(res)
            {
                console.log("New conversation added!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row">
            <div className="right w-1/2">
                <h2 className="text-center font-bold text-5xl">Search book</h2>
                <div className="w-3/5 my-0 mx-auto">
                    <form>
                        <div className="grid grid-cols-1 gap-x-14 gap-y-8 sm:grid-cols-6 mt-5">
                            <div className="sm:col-span-6">
                                <label htmlFor="login" className="block text-sm font-light leading-6 text-gray-900">Login</label>
                                <div className="mt-1">
                                    <label className="relative block">
                                    <img className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtUlEQVR4nO2SMQrCQBBFH1h4BQVT5xzeySvoXSKBIHba6QG08gbpVExSpFxZGJvVHZSM3T74sLCz/xWzkDAiA0qglVRAbll+A1yQu9wNpvxQ/sraQtAqgubfgoeFoFIEhYUgl4WG5VdghhGZLLSRFJbliSgjYA6sgD1wATqJP++Apcz42a8ZAwugVr5nmFre+LcqU+D8Q7ELcgImmmA7oNxJNpqgNxD0msAZJcrRoPwQr0/wzhMNG5sebeXT0AAAAABJRU5ErkJggg==" alt="user icon" />
                                        <input 
                                            type="text"
                                            name="login"
                                            id="login"
                                            className="form-input appearance-none block w-full pl-7 border-b-2 focus:border-green-700 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                            onChange={(e) => setLogin(e.target.value)}
                                            value={login}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="contacts-list w-4/5 mt-10 mx-auto border-t-2 border-gray-100 flex flex-col items-start">
                    {
                        filteredUserList && login ? 
                        (
                            filteredUserList.map((contactUser) => (
                                <div key={contactUser._id} className="p-1 mb-5 flex items-center w-full justify-between">
                                    <div className="flex items-center">
                                        <img src={contactUser?.avatar} className="rounded-full w-[45px] h-[45px]" alt="contact-avatar" />
                                        <p className="ml-4">{contactUser.login}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => contactUser._id && addConversation(contactUser._id)}>
                                        <svg enableBackground="new 0 0 512 512" height="20px" width="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z"/>
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : 
                        (
                            <p className="text-center mt-8 text-gray-200 cursor-default text-xl">Type some user login...</p>
                        )
                    }
                </div>
            </div>
            <div className="left w-1/2 bg-stone-500 h-screen"></div>
        </div>
    )
}