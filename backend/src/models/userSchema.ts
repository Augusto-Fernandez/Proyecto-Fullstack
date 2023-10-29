import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
});
// select hace que cuando se reciba el user, no devuelva email y password. Para obtener email y password hay que solicitarlos implicitamente

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);