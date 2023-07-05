import express from "express";
import { list, detail, remove } from "../actions/costumer";
import { requirePermission } from "../../../kitchen-backend-burguerlicious/src/middleware/requirePermission";

const router = express.Router();

router.get("", list);
router.get("/:costumer_id", detail);
router.delete("/:costumer_id", remove);

export default router;
