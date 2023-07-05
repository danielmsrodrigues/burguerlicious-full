import express from "express";
import { create, list, detail, update, remove } from "../actions/employee";

const router = express.Router();

router.post("", create);
router.get("", list);
router.get("/:employee_id", detail);
router.put("/:employee_id", update);
router.delete("/:employee_id", remove);

export default router;
