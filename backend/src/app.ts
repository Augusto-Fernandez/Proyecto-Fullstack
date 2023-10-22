import express, { NextFunction, Request, Response } from "express";
import noteSchema from "./models/noteSchema";

const app = express();

app.get("/", async (req , res, next)=>{
    try{
        const notes = await noteSchema.find().exec();
        res.status(200).json(notes);
    }catch(e){
        next(e);
    }
});

app.use((req, res, next) => {
    next(Error("Endpoint not Found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((e: unknown, req: Request, res: Response, next: NextFunction) => { // e es unknown porque no sabe que recibe
    console.error(e);
        let errorMessage = "Hubo error che";
        if (e instanceof Error) errorMessage = e.message;//explica que e siempre tiene la propiedad message
        res.status(500).json({e:errorMessage});
});

export default app;