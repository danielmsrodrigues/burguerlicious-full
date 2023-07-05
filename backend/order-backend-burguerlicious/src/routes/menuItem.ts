import { Router } from "express";
import { list } from "../actions/menuItem";

const router = Router();

router.get("", list);

export default router;
