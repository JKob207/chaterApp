export type UserFormData = {
    email: string;
    login: string;
    password: string;
    repeatPassword: string;
}

export type UserFormErrors = {
    emailError: string;
    loginError: string;
    passwordError: string;
    repeatPasswordError: string;
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