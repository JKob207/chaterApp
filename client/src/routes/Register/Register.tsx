import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import "./Register.css";
import { User, UserRegisterData } from '../../types';
import { register } from '../../services/auth';
import { z, ZodType } from 'zod';

export default function Register()
{
    const [hiddenPassword, setHiddenPassword] = useState({
        normal: true,
        confirm: true
    });

    const [formData, setFormData] = useState({
        email: "",
        login: "",
        password: "",
        confirmPassword: ""
    });

    const [formDataErrors, setFormDataErrors] = useState<{
        email?: string[] | undefined;
        login?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
    }>({});

    const registerDataSchema: ZodType<UserRegisterData> = z
    .object({
        email: z.string().email(),
        login: z.string().min(5).max(20),
        password: z.string().min(6).max(20),
        confirmPassword: z.string().min(6).max(20)
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function toggleHiddenPassword(typeOfPass: string)
    {
        type ObjectKey = keyof typeof hiddenPassword;
        const key = typeOfPass as ObjectKey;
        const passwordValue = hiddenPassword[key];

        setHiddenPassword(prev => ({
            ...prev,
            [typeOfPass]: !passwordValue
        }));
    }

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        console.log(formData);

        const validationResult = await registerDataSchema.safeParseAsync(formData);
        if(!validationResult.success)
        {
            const errors = validationResult.error.flatten();
            setFormDataErrors(errors.fieldErrors);
            return;
        }
        
        // send data to check and register
        const newUser: User = {
            email: formData.email,
            login: formData.login,
            password: formData.password
        };

        /*
        try {
            await register(newUser);
        } catch (error) {
            console.log(error);
        }
        */
        
        setFormData({
            email: "",
            login: "",
            password: "",
            confirmPassword: ""
        });
        setFormDataErrors({});
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="right w-1/2">
                    <header>
                        <img className="rounded-full ml-4 mt-7" src="https://placehold.co/50" alt="logo" />
                    </header>
                    <main className="container flex flex-col items-center">
                        <h1 className="text-5xl font-bold text-center mt-12">Register</h1>
                        <p className="my-6 font-light text-center">Lorem ipsum dolor sit amet. <br />Nam egestas eros ut mauris.</p>
                        <form className="my-4">
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
                                        {formDataErrors.email && <span>{formDataErrors.email}</span>}
                                    </div>
                                </div>
                            </div>
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
                                                onChange={handleChange} 
                                                value={formData.login}
                                            />
                                        </label>
                                        {formDataErrors.login && <span>{formDataErrors.login}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-14 gap-y-8 sm:grid-cols-6 mt-5">
                                <div className="sm:col-span-6">
                                    <label htmlFor="password" className="block text-sm font-light leading-6 text-gray-900">Password</label>
                                    <div className="mt-1">
                                        <label className="relative block">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2">
                                                <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z"></path>
                                            </svg>
                                            <input 
                                                type={hiddenPassword.normal ? "password" : "text"}
                                                name="password"
                                                id="password"
                                                className="form-input appearance-none block w-full px-7 border-b-2 focus:border-green-700 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                                onChange={handleChange} 
                                                value={formData.password}
                                            />
                                            {
                                                hiddenPassword.normal ?
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nNWVu0rEQBSGv/UBvBWCoCDYCTYWWlsoLuwLeCtlxc4nsBd3A7oPYKn4BFtbeGEfQhCxUFHUQljdyJEJxHhOJhOw2B8OYcL/fxkyM2egT7UGTPwXPAJiYD0kNABMAfPAAjANVHLg8vRKAEvAGfDkgul6AU6BFecNgs8ClwrUqpsQ+CbwEQCPQ+A7QM8AXABNoAV0DPgesG3B5V9+KuBnoKr42wpcxl9u7X5pGLgzZl5V4E0DntS9Y/4JaL/FB981so0kMAK8GaYDD1x0aGTfgVHfB1oeePp9tl4d+0cNw9Rxh8iCi66M7H7aNJSzyO0ceM3I3AKDWfMy0A04RDXXLrLerrZNE9WVgxaldsuRG18bE5HsFgV6ec+zz2OlpL2sUkBRCfg5MFMGPgYcA48K9AE4ARaLgDV4WhVgHJhzl86kceGY2ghpuZSQXNCyuP2nb5+p293ZkZk1AAAAAElFTkSuQmCC" alt="closed eye" onClick={() => toggleHiddenPassword("normal")} />
                                                :
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO2VTUoDQRCFv+QARtcSdW1wm70Yg4leQIKLCGLwKP6M19B4DJExXkNdqRjNRlAcaShhaKp6Oj/LPKhFN++9bqqrqmGOGaEMrAF1iVXZmwolYBu4Ad6AzItXoA80hDsWNoB7xdSKO6AWa34AfI1hnkk4TafI/AT4NQxSIJFIDY7THlvmO8CPInoHWgq/DQwV/jfQ9MmLwLNxqxZwKG/S9XS7huYJqOSJSSAtDh+ydjf2MTC0Z/+EJWBkkM6F05f1tXLAhaH9FO+oA8rAstFcSdEBoVukimFsik7zpErgkdsB8z1D8wgs+OSmlJhPHkq1aOZWmboRo6IXaLSB5PsSeAg02lFRTjtTjIp9IlGTAZZFxi2wzgTYktp/UUzd3hWwyQxQAlZyH051kj9gDjT8AX3d0XouOd9MAAAAAElFTkSuQmCC" alt="open eye" onClick={() => toggleHiddenPassword("normal")} />
                                            }
                                        </label>
                                        {formDataErrors.password && <span>{formDataErrors.password}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-14 gap-y-8 sm:grid-cols-6 mt-5">
                                <div className="sm:col-span-6">
                                    <label htmlFor="confirmPassword" className="block text-sm font-light leading-6 text-gray-900">Confirm password</label>
                                    <div className="mt-1">
                                        <label className="relative block">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2">
                                                <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z"></path>
                                            </svg>
                                            <input 
                                                type={hiddenPassword.confirm ? "password" : "text"}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                className="form-input appearance-none block w-full px-7 border-b-2 focus:border-green-700 focus:border-b-3 focus:outline-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                                                onChange={handleChange} 
                                                value={formData.confirmPassword}
                                            />
                                            {
                                                hiddenPassword.confirm ?
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nNWVu0rEQBSGv/UBvBWCoCDYCTYWWlsoLuwLeCtlxc4nsBd3A7oPYKn4BFtbeGEfQhCxUFHUQljdyJEJxHhOJhOw2B8OYcL/fxkyM2egT7UGTPwXPAJiYD0kNABMAfPAAjANVHLg8vRKAEvAGfDkgul6AU6BFecNgs8ClwrUqpsQ+CbwEQCPQ+A7QM8AXABNoAV0DPgesG3B5V9+KuBnoKr42wpcxl9u7X5pGLgzZl5V4E0DntS9Y/4JaL/FB981so0kMAK8GaYDD1x0aGTfgVHfB1oeePp9tl4d+0cNw9Rxh8iCi66M7H7aNJSzyO0ceM3I3AKDWfMy0A04RDXXLrLerrZNE9WVgxaldsuRG18bE5HsFgV6ec+zz2OlpL2sUkBRCfg5MFMGPgYcA48K9AE4ARaLgDV4WhVgHJhzl86kceGY2ghpuZSQXNCyuP2nb5+p293ZkZk1AAAAAElFTkSuQmCC" alt="closed eye" onClick={() => toggleHiddenPassword("confirm")} />
                                                :
                                                <img className="cursor-pointer w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO2VTUoDQRCFv+QARtcSdW1wm70Yg4leQIKLCGLwKP6M19B4DJExXkNdqRjNRlAcaShhaKp6Oj/LPKhFN++9bqqrqmGOGaEMrAF1iVXZmwolYBu4Ad6AzItXoA80hDsWNoB7xdSKO6AWa34AfI1hnkk4TafI/AT4NQxSIJFIDY7THlvmO8CPInoHWgq/DQwV/jfQ9MmLwLNxqxZwKG/S9XS7huYJqOSJSSAtDh+ydjf2MTC0Z/+EJWBkkM6F05f1tXLAhaH9FO+oA8rAstFcSdEBoVukimFsik7zpErgkdsB8z1D8wgs+OSmlJhPHkq1aOZWmboRo6IXaLSB5PsSeAg02lFRTjtTjIp9IlGTAZZFxi2wzgTYktp/UUzd3hWwyQxQAlZyH051kj9gDjT8AX3d0XouOd9MAAAAAElFTkSuQmCC" alt="open eye" onClick={() => toggleHiddenPassword("confirm")} />
                                            }
                                        </label>
                                        {formDataErrors.confirmPassword && <span>{formDataErrors.confirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className="block text-sm font-light leading-6 text-dark" htmlFor="avatar">Upload avatar</label>
                                <input 
                                    id="avatar"
                                    type="file"
                                    className="block w-full rounded-md border-0 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    name="avatar"
                                />
                            </div>
                            <div className="flex flex-row justify-center">
                                <Button type="primary" click={handleSubmit}>Sign Up</Button>
                            </div>
                        </form>
                        <p className="font-semibold my-4">Do you have an account? <Link to="/" className="text-green-700">Sign in here</Link></p>
                    </main>
                </div>
                <div className="left w-1/2 bg-stone-500"></div>
            </div>
        </>
    )
}