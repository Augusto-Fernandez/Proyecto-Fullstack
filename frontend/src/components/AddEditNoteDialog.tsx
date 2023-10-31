import { Modal, Form, Button } from "react-bootstrap";
import { NoteModel } from "../models/noteModel";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import * as NotesApi from "../network/note_api"; // lo hace por separado del otro porque no puede ponerle *
import TextInputField from "./Form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: NoteModel,
    onDismiss: () => void,
    onNoteSaved: (note: NoteModel) => void
}

const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues:{
            title: noteToEdit?.title || "",
            text: noteToEdit?.title || ""
        }
    });

    async function onSubmit(input:NoteInput){
        try {
            let noteResponse: NoteModel;
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            }else{
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (e) {
            console.error(e);
            alert(e);
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
// no se que es show. closeButton es el boton de cerrar. 
// row de Form.control es la cantidad de lineas que puede hacer en la caja de texto
// explica que el boton del footer está desconectado del Form por lo que tiene que hacer un id:addNoteForm y conectarlos
// el !! de isInvalid significa que convierte error en un booleano, si es truthy es true, si es falsy es false. ChatGPT explica que funciona al revez por eso es confuzo

export default AddEditNoteDialog;

/* CODIGO ANTERIOR DEL FORMULARIO
    <Modal show onHide={() => onDismiss()}>
        <Modal.Header closeButton>
            <Modal.Title>
                {noteToEdit ? "Edit Note" : "Add Note"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="title"
                            isInvalid={!!errors.title} 
                            {...register("title",{required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="text" {...register("text")}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
*/