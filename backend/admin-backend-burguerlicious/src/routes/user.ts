import express from "express";
import { list, detail, update, remove } from "../actions/user";

const router = express.Router();

router.get("", list);
router.get("/:user_id", detail);
router.put("/:user_id", update);
router.delete("/:user_id", remove);

export default router;
