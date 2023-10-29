import express from "express";
import * as userController from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/", userController.getAuthenticatedUser);

userRouter.post("/signup", userController.signUp);

userRouter.post("/login", userController.login);

userRouter.post("/logout", userController.logout); //los logout se hacen con post

export default userRouter;