import { useForm } from "react-hook-form";
import { UserModel } from "../models/userModel";
import { SignUpCredentials } from "../network/user_api";
import * as UserApi from "../network/user_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./Form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface SignUpModalProps {
    onDismiss: () => void, // es para cerrar el modal
    onSignUpSuccessful: (user: UserModel) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UserApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (e) {
            alert(e);
            console.error(e);
        }
    }

    //show está en true
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    ); //no el pasa id al botón porque está dentro del formulario
}

export default SignUpModal;