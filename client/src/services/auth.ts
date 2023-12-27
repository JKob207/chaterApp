import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { User, UserLoginData } from "../types";

export const register = async (newUser: User): Promise<boolean> => {
    try {
        const response: AxiosResponse<string, null> = await axios.post('http://localhost:3001/auth/register', newUser);
        console.log("New user added to db!");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const login = async(userLoginData: UserLoginData): Promise<boolean> => {
    try {
        const response: AxiosResponse<string, null> = await axios.post('http://localhost:3001/auth/login', userLoginData);
        if(response.status === 200)
        {
            console.log("User logged in!");
            setLocalStorage(response.data)
            return true;
        }
        throw new Error("Wrong response status!");
    } catch (error) {
        console.log(error);
        return false;
    }
}

const setLocalStorage = (res: any) => {
    const expires = moment().add(res.expiresIn);

    localStorage.setItem('token', res.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
}

const getExpiration = () => {
    const expiration = localStorage.getItem('expires');
    try {
        if(!expiration) throw new Error("No expiration data set in local storage!");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
}

const isLoggedIn = () => {
    return moment().isBefore(getExpiration());
}

export const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if(!token) throw new Error("No token set!");

    try {
        const res = await axios.get("http://localhost:3001/auth/protected", {
            headers: {
                'Authorization': token
            }
        });
        if(res.status === 200)
        {
            console.log("User authorized!");
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}