export default function ChatDashboard()
{
    return (
        <div className="flex flex-row mt-2 ml-8">
            <aside className="basis-1/5">
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold">Chat</h2>
                        <p className="text-gray-600">Newest</p>
                    </div>
                    <div className="mt-5">
                        <label className="relative block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                                <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
                            </svg>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search"
                                className="form-input appearance-none block w-full pl-7 border-b-2 border-gray-600 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                </div>
                <div className="chat-list my-5 mx-2">
                    <div className="contact flex flex-row items-center justify-around p-1 mb-5 bg-white drop-shadow-lg rounded-md">
                        <img src="https://placehold.co/45" className="rounded-full" alt="contact-avatar" />
                        <p>John White</p>
                        <div className="flex flex-col items-center">
                            <p className="font-light text-sm">1 min</p>
                            <p className="notofications text-sm	font-semibold bg-emerald-600 text-white rounded-full h-6 w-6 text-center mt-1">2</p>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="ml-8">
                <div className="flex items-center">
                    <img src="https://placehold.co/70" className="rounded-full" alt="current contact avatar" />
                    <div className="current-contact-info flex flex-col ml-4">
                        <p className="text-2xl">John White</p>
                        <p className="font-light text-sm text-gray-600">online <span className="h-2 w-2 bg-emerald-300 inline-block rounded-full"> </span></p>
                    </div>
                </div>
                <div className="mt-8">
                    Messages
                </div>
            </div>
        </div>
    )
}