import express from "express";
import isAuthorizedAdmin from "../middleware/isAuthorizedAdmin.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"
import { createPost, createPostCategory, deletePost, deletePostCategory, getAllPost, getAllPostAdmin, getAllPostCategory, getPost, getPostCategory, getPostSubCategories, updatePost, updatePostCategory } from "../controller/postController.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../assets/postImage"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 109);
        cb(null, `${uniqueSuffix}.jpeg`);
    },
});




const upload = multer({ storage }).single("postImage");
const router = express.Router();

router.post(
    "/create",
    isAuthorizedUser,
    isAuthorizedAdmin,
    upload,
    createPost
);
router.get("/get/:id", getPost);
router.delete("/delete/:id", isAuthorizedUser, isAuthorizedAdmin, deletePost);
router.put(
    "/update/:id",
    isAuthorizedUser, isAuthorizedAdmin,
    upload,
    updatePost
);
router.get("/", getAllPost);
router.get("/admin/get", isAuthorizedUser, isAuthorizedAdmin, getAllPostAdmin);
router.delete("/delete/:id", deletePost);
router.post("/category/create", isAuthorizedUser, isAuthorizedAdmin, createPostCategory);
router.get("/categories", getAllPostCategory);
router.get("/category/get/:id", isAuthorizedUser, isAuthorizedAdmin, getPostCategory);
router.get("/category/subcategory/:id", getPostSubCategories);
router.put("/category/update/:id", isAuthorizedUser, isAuthorizedAdmin, updatePostCategory);
router.delete("/category/delete/:id", isAuthorizedUser, isAuthorizedAdmin, deletePostCategory);

export default router;
