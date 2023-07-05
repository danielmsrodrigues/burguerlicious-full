import { Router } from "express";
import { create, list, remove } from "../actions/order";

const router = Router();

router.post("", create);
router.get("", list);
router.delete("/:order_id", remove);

export default router;
