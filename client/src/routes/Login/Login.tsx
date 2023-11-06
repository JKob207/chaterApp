import { useState } from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

export default function Login()
{
    const [hiddenPassword, setHiddenPassword] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function toggleHiddenPassword()
    {
        setHiddenPassword(prev => !prev);
    }

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        console.log(formData);
        
        // send data to check auth and login
        
        setFormData({
            email: "",
            password: ""
        });
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="right w-1/2">
                    <header>
                        <img className="rounded-full ml-4 mt-7" src="https://placehold.co/50" alt="logo" />
                    </header>
                    <main className="container flex flex-col items-center">
                        <h1 className="text-5xl font-bold text-center mt-12">Login</h1>
                        <p className="my-6 font-light text-center">Lorem ipsum dolor sit amet. <br />Nam egestas eros ut mauris.</p>
                        <form className="my-12">
                            <div className="grid grid-cols-1 gap-x-14 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="email" className="block text-sm font-light leading-6 text-gray-900">Email</label>
                                    <div className="mt-1">
                                        <label className="relative block">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <input 
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="form-input appearance-none block w-full pl-7 border-b-2 focus:border-green-700 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                                onChange={handleChange} 
                                                value={formData.email}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-14 gap-y-8 sm:grid-cols-6 mt-10">
                                <div className="sm:col-span-6">
                                    <label htmlFor="password" className="block text-sm font-light leading-6 text-gray-900">Password</label>
                                    <div className="mt-1">
                                        <label className="relative block">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2">
                                                <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z"></path>
                                            </svg>
                                            <input 
                                                type={hiddenPassword ? "password" : "text"}
                                                name="password"
                                                id="password"
                                                className="form-input appearance-none block w-full px-7 border-b-2 focus:border-green-700 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                                onChange={handleChange} 
                                                value={formData.password}
                                            />
                                            {
                                                hiddenPassword ?
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nNWVu0rEQBSGv/UBvBWCoCDYCTYWWlsoLuwLeCtlxc4nsBd3A7oPYKn4BFtbeGEfQhCxUFHUQljdyJEJxHhOJhOw2B8OYcL/fxkyM2egT7UGTPwXPAJiYD0kNABMAfPAAjANVHLg8vRKAEvAGfDkgul6AU6BFecNgs8ClwrUqpsQ+CbwEQCPQ+A7QM8AXABNoAV0DPgesG3B5V9+KuBnoKr42wpcxl9u7X5pGLgzZl5V4E0DntS9Y/4JaL/FB981so0kMAK8GaYDD1x0aGTfgVHfB1oeePp9tl4d+0cNw9Rxh8iCi66M7H7aNJSzyO0ceM3I3AKDWfMy0A04RDXXLrLerrZNE9WVgxaldsuRG18bE5HsFgV6ec+zz2OlpL2sUkBRCfg5MFMGPgYcA48K9AE4ARaLgDV4WhVgHJhzl86kceGY2ghpuZSQXNCyuP2nb5+p293ZkZk1AAAAAElFTkSuQmCC" alt="closed eye" onClick={toggleHiddenPassword} />
                                                :
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO2VTUoDQRCFv+QARtcSdW1wm70Yg4leQIKLCGLwKP6M19B4DJExXkNdqRjNRlAcaShhaKp6Oj/LPKhFN++9bqqrqmGOGaEMrAF1iVXZmwolYBu4Ad6AzItXoA80hDsWNoB7xdSKO6AWa34AfI1hnkk4TafI/AT4NQxSIJFIDY7THlvmO8CPInoHWgq/DQwV/jfQ9MmLwLNxqxZwKG/S9XS7huYJqOSJSSAtDh+ydjf2MTC0Z/+EJWBkkM6F05f1tXLAhaH9FO+oA8rAstFcSdEBoVukimFsik7zpErgkdsB8z1D8wgs+OSmlJhPHkq1aOZWmboRo6IXaLSB5PsSeAg02lFRTjtTjIp9IlGTAZZFxi2wzgTYktp/UUzd3hWwyQxQAlZyH051kj9gDjT8AX3d0XouOd9MAAAAAElFTkSuQmCC" alt="open eye" onClick={toggleHiddenPassword} />
                                            }
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Button type="primary" click={handleSubmit}>Sign In</Button>
                            </div>
                        </form>
                        <p className="font-semibold">Don't have an account? <Link to="register" className="text-green-700">Sign up here</Link></p>
                    </main>
                </div>
                <div className="left w-1/2 bg-stone-500 h-screen"></div>
            </div>
        </>
    )
}