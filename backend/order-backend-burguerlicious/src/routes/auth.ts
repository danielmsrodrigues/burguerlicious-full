import { Router } from "express";
import { login, profile, reset } from "../actions/auth";

const router = Router();

router.post("/login", login);
router.get("/profile", profile);
router.put("/reset", reset);

export default router;
