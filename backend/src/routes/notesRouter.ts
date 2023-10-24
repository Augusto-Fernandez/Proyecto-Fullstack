import {Router} from "express";

import * as nodeController from "../controllers/notesController";// al poner * trae todas las rutas juntas

const notesRouter = Router();

notesRouter.get("/", nodeController.getNotes); // como puso * tiene que hacer nodeController antes de cada función
notesRouter.get("/:id", nodeController.getNote);
notesRouter.post("/", nodeController.createNote);
notesRouter.patch("/:id", nodeController.updateNote);// dice que patch se usa para updatear un recurso
notesRouter.delete("/:id", nodeController.deleteNote);

export default notesRouter;
