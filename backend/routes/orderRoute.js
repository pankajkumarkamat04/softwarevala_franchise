import express from "express";
import {
    createOrder,
    getAdminAllOrder,
    getAllOrder,
    getOrder,
    isOrderAvailable,
    updateOrder,
} from "../controller/orderController.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import isAuthorizedAdmin from "../middleware/isAuthorizedAdmin.js";

const router = express.Router();

router.post("/create", isAuthorizedUser, createOrder);
router.put("/update/:id", isAuthorizedUser, updateOrder);
router.get("/get/:id", isAuthorizedUser, getOrder);
router.get("/getall", isAuthorizedUser, getAllOrder);
router.get("/isorderavailable/:id", isAuthorizedUser, isOrderAvailable);
router.get("/admin/getall", isAuthorizedUser, isAuthorizedAdmin, getAdminAllOrder);

export default router;
