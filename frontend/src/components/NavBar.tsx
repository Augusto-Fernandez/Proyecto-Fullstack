import { Container, Nav, Navbar } from "react-bootstrap";
import { UserModel } from "../models/userModel";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";


interface NavBarProps {
    loggedInUser: UserModel | null, //toma los datos de usuario logueado o null si no está logueado y lo hace opcional
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Cool Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to='/privacy'>
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}// explica que no se debe usar links con href porque reinicia la pagina, lo que hace es usar <Link>
// sacó <Link> y en Nav.Link puso "as" y le pasó Link para que se comporte como Link

export default NavBar;