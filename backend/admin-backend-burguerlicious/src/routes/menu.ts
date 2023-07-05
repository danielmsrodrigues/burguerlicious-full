import express from "express";
import { create, list, update, remove, detail } from "../actions/menu";

const router = express.Router();

router.post("", create);
router.get("", list);
router.get("/:menu_id", detail);

router.put("/:menu_id", update);
router.delete("/:menu_id", remove);

export default router;
