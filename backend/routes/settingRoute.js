import express from "express";
import { isAuthorizedUser } from "../middleware/isAuthorizedUser.js";
import isAuthorizedAdmin from "../middleware/isAuthorizedAdmin.js";
import { getAPISetting, getGeneralSetting, getMailSetting, getPaymentSetting, updateAPISetting, updateGeneralSetting, updateMailSetting, updatePaymentSetting } from "../controller/settingController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../assets/websiteImages"));
    },
    filename: function (req, file, cb) {


        if (file.fieldname == "siteLogo") {
            if (fs.existsSync(path.join(__dirname, `../assets/websiteImages/siteLogo.jpeg`))) {
                fs.unlink(
                    path.join(__dirname, `../assets/websiteImages/siteLogo.jpeg`),
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                cb(null, `siteLogo.jpeg`);
            } else {

                cb(null, `siteLogo.jpeg`);
            }
        } else if (file.fieldname == "siteFavicon") {
            if (fs.existsSync(path.join(__dirname, `../assets/websiteImages/siteFavicon.jpeg`))) {
                fs.unlink(
                    path.join(__dirname, `../assets/websiteImages/siteFavicon.jpeg`),
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                cb(null, `siteFavicon.jpeg`);
            } else {

                cb(null, `siteFavicon.jpeg`);
            }
        } else if (file.fieldname == "bannerImage") {
            if (fs.existsSync(path.join(__dirname, `../assets/websiteImages/bannerImage.jpeg`))) {
                fs.unlink(
                    path.join(__dirname, `../assets/websiteImages/bannerImage.jpeg`),
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                cb(null, `bannerImage.jpeg`);
            } else {
                cb(null, `bannerImage.jpeg`);
            }
        }

    },
});




const upload = multer({ storage }).fields([{ name: "siteLogo", maxCount: 1 }, { name: "siteFavicon", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }]);


router.put("/general/update", isAuthorizedUser, isAuthorizedAdmin, upload, updateGeneralSetting)
router.put("/mail/update", isAuthorizedUser, isAuthorizedAdmin, updateMailSetting)
router.put("/payment/update", isAuthorizedUser, isAuthorizedAdmin, updatePaymentSetting)
router.put("/api/update", isAuthorizedUser, isAuthorizedAdmin, updateAPISetting)
router.get("/general/get", getGeneralSetting)
router.get("/mail/get", isAuthorizedUser, isAuthorizedAdmin, getMailSetting)
router.get("/payment/get", getPaymentSetting)
router.get("/api/get", getAPISetting)

export default router;