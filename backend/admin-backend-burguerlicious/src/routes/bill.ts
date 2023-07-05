import express from "express";
import { list, detail } from "../actions/bill";

const router = express.Router();

router.get("", list);
router.get("/:bill_id", detail);

export default router;
