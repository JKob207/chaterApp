import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { User } from "../../types";

type HeaderProps = {
    user: User
}

export default function Header({ user } : HeaderProps)
{
    const navigate = useNavigate();

    async function logoutUser()
    {
        try {
            logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="flex flex-row items-center justify-end">
            <img className="p-4" src="https://placehold.co/50" alt="notifications" />
            <a className="p-4" href="#">My profile</a>
            <p className="p-4 cursor-pointer" onClick={logoutUser}>Sign out</p>
            <img className="p-4 rounded-full" src="https://placehold.co/50" alt="notifications" />
        </header>
    )
}