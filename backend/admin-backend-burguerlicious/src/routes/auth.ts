import { Router } from "express";
import { login, register, profile } from "../actions/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);

export default router;
