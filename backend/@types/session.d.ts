import mongoose from "mongoose";

//este codigo degine userId del signup de userController
//hizo falta modifica el tsconfig en typeRoots

declare module "express-session" { //express-session porque es el paquete que manaje session
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}