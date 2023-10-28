import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { NoteModel} from "../models/noteModel";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md" //icono tacho

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string // lo hace para poder agregar otra clase de css
}

const Note = ({note, onNoteClicked, onDeleteNoteClicked, className}:NoteProps) => {
    const {title, text, createdAt, updatedAt} = note; //deconstruye note porque dice que es mas cómodo para trabajar

    let createUpdatedText:string;

    if(updatedAt>createdAt){ //explica que esto no es recomendable porque se va a ejecutar en cada render
        createUpdatedText = "Updated: " + formatDate(updatedAt);
    }else{
        createUpdatedText = "Created: " + formatDate(createdAt);
    }
    
    return(
        <Card 
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {title}
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                    {createUpdatedText}
            </Card.Footer>
        </Card>
    )
}
//tex-muted es una clase de bootstrap para apagar el color del texto

export default Note;