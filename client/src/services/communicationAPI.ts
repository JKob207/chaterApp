import axios, { AxiosResponse } from "axios";
import { ConversationType, MessagesType } from "../types";

export const getConversations = async (id: string) =>
{
    try {
        const res: AxiosResponse<ConversationType[], null> = await axios.get('http://localhost:3001/conversations/'+id);
        if(res)
        {
            return res;
        }else throw new Error("Wrong response!");
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getMessages = async (chatID: string) => {
    try {
        const res: AxiosResponse<MessagesType[], null> = await axios.get('http://localhost:3001/messages/'+chatID);
        if(res)
        {
            return res;
        }else throw new Error("Wrong response!");
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const postMessage = async (message: MessagesType) => {
    try {
        await axios.post('http://localhost:3001/messages', message);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const postConversation = async (members: {senderId: string; receiverId: string;}) => {
    try {
        await axios.post('http://localhost:3001/conversations', members);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}