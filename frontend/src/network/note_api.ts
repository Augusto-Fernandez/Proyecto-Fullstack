import { NoteModel } from "../models/noteModel";

async function fetchData(input: RequestInfo, init?: RequestInit) { //son los mismos argumentos que recibe fetch()
    const response = await fetch(input, init);
    if(response.ok){//ok es una propiedad de la respuesta
        return response;
    } else {
        const errorBody = await response.json(); //recibe el json del error del endpoint
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchNotes():Promise<NoteModel[]> {
    const response = await fetchData("/api/notes", {method:"GET"});//hace el get a esa URL. Antes estaba http://localhost:8081/api/notes pero lo puso en el proxy del package.json porque había un problema de CORS
    return response.json(); //recibe el json de la respuesta
}

export interface NoteInput{
    title: string,
    text?: string
}

export async function createNote(note: NoteInput): Promise<NoteModel>{
    const response = await fetchData("/api/notes", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<NoteModel>{
    const response = await fetchData("/api/notes/" + noteId, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

export async function deleteNote(noteId: string){
    await fetchData("/api/notes/" + noteId, {method:"DELETE"});
}