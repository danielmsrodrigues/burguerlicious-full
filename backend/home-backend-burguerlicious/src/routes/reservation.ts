import express from "express";
import { create, remove, list } from "../actions/reservation";

const router = express.Router();

router.post("", create);
router.delete("/:reservation_id", remove);
router.get("", list);

export default router;
