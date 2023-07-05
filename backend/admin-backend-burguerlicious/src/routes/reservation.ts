import express from "express";
import { list, detail, update, remove, done } from "../actions/reservation";

const router = express.Router();

router.get("", list);
router.get("/done", done);
router.get("/:reservation_id", detail);
router.put("/:reservation_id", update);
router.delete("/:reservation_id", remove);

export default router;
