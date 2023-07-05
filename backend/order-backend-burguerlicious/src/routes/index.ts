import express, { Request, Response } from "express";
import authRoutes from "./auth";
import billRoutes from "./bill";
import orderRoutes from "./order";
import menuItemRoutes from "./menuItem";
import reservationRoutes from "./reservations";
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
router.use(requirePermission("15e218a0-4d42-4ba4-87a7-cf259692e0e2")); //PERMISSION EMPLOYEE
router.use("/bill", billRoutes);
router.use("/order", orderRoutes);
router.use("/menuItem", menuItemRoutes);
router.use("/reservation", reservationRoutes);

export default router;
