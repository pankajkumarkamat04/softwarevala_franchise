import express from "express";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import isAuthorizedAdmin from "../middleware/isAuthorizedAdmin.js";
import { dashboardData } from "../controller/adminController.js";


const router = express.Router();
router.get("/dashboard/data", isAuthorizedUser, isAuthorizedAdmin, dashboardData);

export default router;
