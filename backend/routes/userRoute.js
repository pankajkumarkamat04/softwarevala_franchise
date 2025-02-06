import express from "express";
import { createUser, deleteUser, forgotPass, getAllUser, getUserAdmin, getUserProfile, loginUser, resetPassword, resetTokenVerify, updatePassword, updateUser, updateUserAdmin, userLogout } from "../controller/userController.js";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import isAdmin from "../middleware/isAuthorizedAdmin.js";

const route = express.Router()

route.post("/register", createUser)
route.post("/login", loginUser)
route.get("/logout", isAuthorizedUser, userLogout);
route.get("/profile", isAuthorizedUser, getUserProfile);
route.put("/profile", isAuthorizedUser, updateUser);
route.post("/update/password", isAuthorizedUser, updatePassword);
route.get("/admin/users", isAuthorizedUser, isAdmin, getAllUser);
route.get("/admin/:id", isAuthorizedUser, isAdmin, getUserAdmin);
route.put("/admin/:id", isAuthorizedUser, isAdmin, updateUserAdmin);
route.delete("/delete/:id", isAuthorizedUser, isAdmin, deleteUser);
route.post("/password/forgot", forgotPass);
route.get("/password/verify/:token", resetTokenVerify);
route.put("/password/reset/:token", resetPassword);

export default route