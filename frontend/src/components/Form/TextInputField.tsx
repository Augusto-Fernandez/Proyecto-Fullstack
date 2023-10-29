import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any // permite agregar mas propiedades aunque nos estén definidas en la interfaz
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => { //props son las propiedades adicionales
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}//este es el formulario que estaba en AddEditNoteDialog
// controlId={name + "-input"} conecta el Form.Group con Form.Label, por ejemplo al tocar Label se ejecuta el formulario

export default TextInputField;