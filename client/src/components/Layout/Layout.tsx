import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { userContext } from "../AuthRequired/AuthRequired";
import Header from "../Header/Header";

export default function Layout()
{
    const user = useContext(userContext);
    
    return (
        <div className="flex flex-row h-screen">
            <aside className="basis-1/6 border-r-2 border-gray-100">
                <div className="logo-container py-5 flex justify-center border-b-2 border-gray-100">
                    <img src="https://placehold.co/50" className="rounded-full" alt="logo" />
                </div>
                <div className="menu h-4/5 flex flex-col justify-evenly">
                    <div className="flex justify-center border-r-4 border-black">
                        <a href="#">
                            <img src="https://placehold.co/50" alt="menu-1" />
                            <p>Lorem</p>
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="#" className="text-center">
                            <img src="https://placehold.co/50" alt="menu-2" />
                            <p>ipsum</p>
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="#" className="text-center">
                            <img src="https://placehold.co/50" alt="menu-3" />
                            <p>sit</p>
                        </a>
                    </div>
                </div>
            </aside>
            <main className="main-container basis-5/6">
                {user && <Header user={user} />}
                <Outlet />
            </main>
        </div>
    )
}