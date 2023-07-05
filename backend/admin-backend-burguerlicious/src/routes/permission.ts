import express from "express";
import { create, list, remove } from "../actions/permission";

const router = express.Router();

router.post("", create);
router.get("", list);
router.delete("/:permission_id", remove);

export default router;
