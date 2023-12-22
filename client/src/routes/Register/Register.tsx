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
        confirmPassword: "",
        avatar: ""
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

    function convertToBase64(file: File): Promise<string | ArrayBuffer | null>
    {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (err) => {
                reject(err);
            }
        });
    }

    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            if(event.target.files === null) throw new Error("No file!");
            const file = event.target.files[0];
            const base64File = await convertToBase64(file);
            if(typeof base64File !== "string") throw new Error("Wrong base64 file data type!");
            setFormData(prev => ({
                ...prev,
                avatar: base64File
            }))
        } catch (error) {
            console.log(error);
        }

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

        if(!formData.avatar)
        {
            setFormData(prev => ({
                ...prev,
                avatar: "data:image/jpeg;base64,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"
            }));
        }
        
        // send data to check and register
        const newUser: User = {
            email: formData.email,
            login: formData.login,
            password: formData.password,
            avatar: formData.avatar
        };

        try {
            await register(newUser);
        } catch (error) {
            console.log(error);
        }
        
        setFormData({
            email: "",
            login: "",
            password: "",
            confirmPassword: "",
            avatar: ""
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
                                    accept='.jpeg, .png, .jpg'
                                    onChange={handleFileUpload}
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