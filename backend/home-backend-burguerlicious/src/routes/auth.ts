import { Router } from "express";
import { login, register, profile, confirmEmail } from "../actions/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.put("/confirm/:user_id", confirmEmail);

export default router;
