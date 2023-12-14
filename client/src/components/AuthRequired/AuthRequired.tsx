import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "../../services/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../../types";

export const userContext = createContext<User | null>(null);

export default function AuthRequired()
{
    const [action, setAction] = useState(<h1>Loading...</h1>);
    const location = useLocation();
    const userContextData = useContext(userContext);

    useEffect(() => {

        const AuthObserver = async () => {
            try {
                console.log(location);
                if(!location.state.user && !userContextData)
                {
                    throw new Error("No user provided!");
                }
                const result = await checkAuth();
                if(!result) throw new Error("No authorization!");
                else {
                    const userData = location.state.user ? location.state.user : userContextData;
                    console.log(userData);
                    setAction(
                        <userContext.Provider value={userData}>
                            <Outlet />
                        </userContext.Provider>
                    )
                }
            } catch (error) {
                console.log(error);
                setAction(
                    <Navigate to="/" />
                )
            }
        };

        AuthObserver();
    }, [])

    return (
        <>
            {action}
        </>
    )
}