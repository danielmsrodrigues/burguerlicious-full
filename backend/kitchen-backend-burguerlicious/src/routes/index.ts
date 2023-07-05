import express, { Request, Response } from "express";
import authRoutes from "./auth";
import orderRoutes from "./order";
import { name, version } from "../../package.json";
import { requirePermission } from "../middleware/requirePermission";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.json({
    name,
    version,
  })
);

router.use("/auth", authRoutes);
router.use(requirePermission("319010fe-0be4-4f71-8b33-2a5efe1fcda5")); //PERMISSION COOKER
router.use("/order", orderRoutes);

export default router;
