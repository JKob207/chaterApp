import { User } from "../types"
import axios from "axios"

export const addUser = async (newUser: User) => {
    try {
        await axios.post("http://127.0.0.1:3001/addUser", newUser);
        console.log("New user added to db!");
    } catch (error) {
        console.log(error);
    }
}

export const listAllUsers = async (): Promise<User[]> => {
    let result: User[];
    try {
        const response = await axios.get("http://127.0.0.1:3001/getAllUsers");
        const data = response.data;
        result = data;
    } catch (error) {
        console.log(error);
        result = [];
    }
    return result;
}

export const updateUser = async (userId: string, userData: User) => {
    try {
        await axios.put("http://127.0.0.1:3001/updateUser", {
            id: userId,
            newUserData: userData
        });
        console.log("User updated!");
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (userId: string) => {
    try {
        await axios.delete(`http://127.0.0.1:3001/deleteUser/${userId}`);
        console.log("User deleted!");
    } catch (error) {
        console.log(error);
    }
}