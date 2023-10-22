import { RequestHandler } from "express";
import noteSchema from "../models/noteSchema";

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
        const note = await noteSchema.findById(noteId).exec();

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const createNote: RequestHandler = async (req, res, next) => {
    try {
        const title = req.body.title;
        const text = req.body.text;
        const notes = await noteSchema.create({
            title: title,
            text: text
        });
        res.status(201).json(notes);
    } catch (error) {
        next(error);
    }
};