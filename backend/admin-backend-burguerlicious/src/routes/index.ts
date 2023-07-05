import express, { Request, Response } from "express";
import authRoutes from "./auth";
import billRoutes from "./bill";
import costumerRoutes from "./costumer";
import employeeRoutes from "./employee";
import menuRoutes from "./menu";
import menuItemRoutes from "./menuItem";
import permissionRoutes from "./permission";
import reservationRoutes from "./reservation";
import restaurantTableRoutes from "./restaurantTable";
import userRoutes from "./user";
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
router.use(requirePermission("679c5ef1-65ac-4ded-bd83-fc773e6a43d5")); //PERMISSION ADMIN
router.use("/bill", billRoutes);
router.use("/costumer", costumerRoutes);
router.use("/employee", employeeRoutes);
router.use("/menu", menuRoutes);
router.use("/menuItem", menuItemRoutes);
router.use("/permission", permissionRoutes);
router.use("/reservation", reservationRoutes);
router.use("/restaurantTable", restaurantTableRoutes);
router.use("/user", userRoutes);

export default router;
