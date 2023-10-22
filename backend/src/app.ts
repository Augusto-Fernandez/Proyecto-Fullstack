import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import notesRouter from "./routes/notesRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", notesRouter);

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
