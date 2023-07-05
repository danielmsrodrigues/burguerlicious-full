import { Router } from "express";
import { list, detail } from "../actions/reservation";

const router = Router();

router.get("", list);
router.get("/:reservation_id", detail);

export default router;
