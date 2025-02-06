import express from "express";
import { createContact, getAllContactForm } from "../controller/extraController.js";


const router = express.Router();


router.post("/contact/create", createContact);
router.get("/contact/getall", getAllContactForm);

export default router;