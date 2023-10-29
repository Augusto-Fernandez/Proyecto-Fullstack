import { RequestHandler } from "express";
import userSchema from "../models/userSchema";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId;

        if(!authenticatedUser){
            throw createHttpError(401, "User not authenticated");
        }

        const user = await userSchema.findById(authenticatedUser).select("+email").exec();
        //.select("+email") es porque en el esquema lo había puesto como select a ese campo, esta es la manera de traerlo
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody{
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) =>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        const passwordRaw = req.body.password;

        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await userSchema.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail = await userSchema.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await userSchema.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await userSchema.findOne({ username: username }).select("+password +email").exec();
        //.select("+password +email") es porque en el esquema los había puesto como select a esos campos, esta es la manera de traerlos

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => { //como no es asincrona, se le tiene que pasar un callback
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};
