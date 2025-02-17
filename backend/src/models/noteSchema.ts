import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true }, //para saber quien hizo la nota
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });//timestamps es un propiedad de mongoose para poner el tiempo

type Note = InferSchemaType<typeof noteSchema>;// InferSchemaType toma el tipado del esquema

export default model<Note>("Note", noteSchema);//"Note" va a ser el nombre de la colección
