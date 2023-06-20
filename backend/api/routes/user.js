import { Router } from "express";
import {
  User_login,
  logout,
  register_User,
} from "../controllers/user.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/register", register_User);

router.post("/login", User_login);

router.post("/logout", authentication, logout);


export default router;
