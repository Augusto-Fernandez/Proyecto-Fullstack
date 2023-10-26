export interface NoteModel {
    _id: string,
    title: string,
    text?: string,
    createdAt: string, // es el timestamp que se hizo en el esquema de mongo
    updatedAt: string
}