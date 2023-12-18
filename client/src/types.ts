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
    email: string;
    login: string;
    password: string;
}