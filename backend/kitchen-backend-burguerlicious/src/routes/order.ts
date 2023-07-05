import express from "express";
import { list, detail, update } from "../actions/order";

const router = express.Router();

router.get("", list);
router.get("/:order_id", detail);
router.put("/:order_id", update);

export default router;
