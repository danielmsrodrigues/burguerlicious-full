import express from "express";
import { create, list, remove } from "../actions/restaurantTable";

const router = express.Router();

router.post("", create);
router.get("", list);
router.delete("/:restaurantTable_id", remove);

export default router;
