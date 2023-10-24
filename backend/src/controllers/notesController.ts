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

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404, "Invalid Id");
        }

        const note = await noteSchema.findById(noteId).exec();// ver porque usa exec()

        if(!note){
            throw createHttpError(404, "Note not Found");
        }

        res.status(200).json(note);
    } catch (e) {
        next(e);
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
    } catch (e) {
        next(e);
    }
};

interface UpdateNoteParam{
    id: string
}

interface UpdateNoteBody{
    title?: string,
    text?:string
}

export const updateNote: RequestHandler<UpdateNoteParam, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const title = req.body.title;
        const text = req.body.text;

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404, "Invalid Id");
        }

        if(!title){
            throw createHttpError(400, "Note must hace a title");
        }

        const note = await noteSchema.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "Note not Found");
        }

        note.title = title;
        note.text = text;

        const updatedNote = await note.save(); // explica que no hizo FindOneAndUpdate() porque hace otro fetch cuando ya se hizo un primer fetch en el findById
        res.status(200).json(updatedNote);
    } catch (e) {
        next(e);
    }
};

export const deleteNote: RequestHandler<UpdateNoteParam, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    try {
        const noteId = req.params.id;

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404, "Invalid Id");
        }

        const note = await noteSchema.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "Note not Found");
        }

        await note.deleteOne(); // el usó remove(), pero es de una versión vieja de mongoose
        res.sendStatus(204); // como no necesita que devuelva un json, sendStatus devuelve una respuesta. send() no devuelve respuestas, en los otros endpoints lo hacía json()
    } catch (e) {
        next(e);
    }
};
