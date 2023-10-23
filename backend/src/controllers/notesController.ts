import { RequestHandler } from "express";
import noteSchema from "../models/noteSchema";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req , res, next)=>{ // este tipado le da a req, res y next el tipado Request, Responce y NextFunction de Express
    try{
        const notes = await noteSchema.find().exec();
        res.status(200).json(notes);
    }catch(e){
        next(e);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const note = await noteSchema.findById(noteId).exec();// ver porque usa exec()

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404, "Invalid Id");
        }

        if(!noteId){
            throw createHttpError(404, "Note not Found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface createNoteBody{
    title?: string, // lo pone como opcional porque si no recibe title hace falta declinar la petición 
    text?:string // lo pone como opcional porque en el esquema se declaró como opcional
}

export const createNote: RequestHandler<unknown, unknown, createNoteBody, unknown> = async (req, res, next) => { //no entendí porque lo pasó así, dice que va unknown porque any es inseguro
    try {
        const title = req.body.title;
        const text = req.body.text;

        if(!title){
            throw createHttpError(400, "Note must hace a title");
        }

        const notes = await noteSchema.create({
            title: title,
            text: text
        });
        res.status(201).json(notes);
    } catch (error) {
        next(error);
    }
};