import {UserModel} from "../models/userModel";

async function fetchData(input: RequestInfo, init?: RequestInit) { //son los mismos argumentos que recibe fetch()
    const response = await fetch(input, init);
    if(response.ok){//ok es una propiedad de la respuesta
        return response;
    } else {
        const errorBody = await response.json(); //recibe el json del error del endpoint
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<UserModel> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}


export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<UserModel> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<UserModel> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}