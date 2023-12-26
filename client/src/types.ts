export type UserRegisterData = {
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
}

export type UserLoginData = {
    email: string;
    password: string;
}

export type User = {
    _id?: string;
    email: string;
    login: string;
    password: string;
    avatar: string;
}

export type ConversationType = {
    _id?: string;
    members: string[];
}

export type MessagesType = {
    _id?: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt?: Date;
}