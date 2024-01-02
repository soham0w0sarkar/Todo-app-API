import express from "express";
import { register } from "../controllers/company.js";


const companyRouter = express.Router();

companyRouter.route("/register").post(register);

export default companyRouter;
