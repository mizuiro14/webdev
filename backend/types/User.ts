export interface User {
    firstName: string;
    userName: string;
    email: string;
    password: string;
}

export interface UserLogin {
    password: string;
    userName: string;
}