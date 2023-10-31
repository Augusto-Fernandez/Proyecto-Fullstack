import { Button, Navbar } from "react-bootstrap";
import { UserModel } from "../models/userModel";
import * as UserApi from "../network/user_api";

interface NavBarLoggedInViewProps {
    user: UserModel,
    onLogoutSuccessful: () => void
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await UserApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;