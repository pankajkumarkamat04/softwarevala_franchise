import express from "express";
import { paypalController } from "../controller/paymentController.js";

const router = express.Router()

router.get("/paypal", paypalController)

export default router