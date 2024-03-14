
import express from "express";
import { userSignUp } from "../controller/userController.js";

const Router = express.Router();

Router.post('/signup', userSignUp);

export default Router;