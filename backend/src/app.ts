import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import createHttpError, { isHttpError } from "http-errors"; // explica que cuando se import con {} es porque no es una importación default

import notesRouter from "./routes/notesRouter";
import userRouter from "./routes/usersRouter";
import env from "./util/validateEnv";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.DB_URI
    })
}));
app.use(cors()); // tengo que configurar CORS para que no haya problema entre el backend y frontend

app.use("/api/users", userRouter);
app.use("/api/notes", requiresAuth, notesRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not Found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((e: unknown, req: Request, res: Response, next: NextFunction) => { // e es unknown porque no sabe que recibe
    console.error(e);
        let errorMessage = "Hubo error che";
        let errorStatus = 500; // pasa 500 porque es el error standard
        //if (e instanceof Error) errorMessage = e.message; explica que e siempre tiene la propiedad message
        if(isHttpError(e)){
            errorStatus = e.status;
            errorMessage = e.message;
        }
        res.status(errorStatus).json({e:errorMessage});
});

export default app;
