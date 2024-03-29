import { useContext, useEffect, useState } from "react"
import { User } from "../../types";
import { listAllUsers } from "../../services/usersAPI";
import { userContext } from "../../components/AuthRequired/AuthRequired";
import { postConversation } from "../../services/communicationAPI";
import ContactBookUser from "../../components/ContactBookUser/ContactBookUser";

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
                                <ContactBookUser _id={contactUser._id} avatar={contactUser.avatar} login={contactUser.login} addConversation={addConversation} senderId={user?._id} />
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