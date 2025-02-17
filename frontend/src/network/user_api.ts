import {UserModel} from "../models/userModel";
import { UnauthorizedError, ConflictError } from "../errors/http_errors";

async function fetchData(input: RequestInfo, init?: RequestInit) { //son los mismos argumentos que recibe fetch()
    const response = await fetch(input, init);
    if (response.ok) {//ok es una propiedad de la respuesta
        return response;
    } else {
        const errorBody = await response.json();//recibe el json del error del endpoint
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
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