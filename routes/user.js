import express from "express";
import {
  amIloggedIn,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenciated } from "../utils/features.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/amIloggedIn", isAuthenciated, amIloggedIn);

router.get("/me", isAuthenciated, getMyProfile);

router.get("/logout", logout);

export default router;
