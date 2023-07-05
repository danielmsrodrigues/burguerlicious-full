import express from "express";
import { create, list, detail, remove } from "../actions/menuItem";

const router = express.Router();

router.post("", create);
router.get("", list);
router.get("/:menuItem_id", detail);
router.delete("/:menuItem_id", remove);

export default router;
