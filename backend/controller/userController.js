import userModel from "../model/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import forgotPassModel from "../model/forgotPassModel.js";
import mongoose from "mongoose";
import { forgotPassMailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto"
import nodemailer from "nodemailer"

const createUser = CatchAsyncError(async (req, res, next) => {
    const { name, email, phoneNo, country, password } = req.body

    if (!name) {
        return next(new errorHandler("Name is reurired ", 404));
    }
    if (!email) {
        return next(new errorHandler("Email is reurired ", 404));
    }
    if (!phoneNo) {
        return next(new errorHandler("Phone No is reurired ", 404));
    }
    if (!country) {
        return next(new errorHandler("Country is reurired ", 404));
    }
    if (!password) {
        return next(new errorHandler("Password is reurired ", 404));
    }

    const user = new userModel({ name, email, phoneNo, country, password })

    await user.save()

    const token = await user.getjwttoken()

    res.cookie("token", token, {
        expires: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    }).json({
        message: "User Created Successfully"
    })
})

const loginUser = CatchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;


    if (!email) {
        return next(new errorHandler("Email is reurired ", 404));
    }
    if (!password) {
        return next(new errorHandler("Password is reurired ", 404));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new errorHandler("Email Not Found", 404));
    }

    const passwordMatched = await user.comparePass(password);

    if (!passwordMatched) {
        return next(new errorHandler("Password Not Matched", 404));
    }

    const token = await user.getjwttoken();

    res.status(200).cookie("token", token, {
        expires: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    }).json({
        message: "Login Successfully"
    });

})

const userLogout = CatchAsyncError(async (req, res, next) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logout Successfully",
    });
});

const getUserProfile = CatchAsyncError(async (req, res, next) => {
    const _id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }

    const user = await userModel.findById(_id).select("name email phoneNo role");

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    res.status(200).json({ user });

})

const updateUser = CatchAsyncError(async (req, res, next) => {
    const _id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }

    const user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    res.status(200).json({ message: "Profile Updated Successfully" });
});

const getAllUser = CatchAsyncError(async (req, res, next) => {
    const result = await userModel.find();

    res.status(200).json({
        result,
    });
});

const getUserAdmin = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }

    const user = await userModel.findById(id);

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }
    res.status(200).json({ user });
});

const updateUserAdmin = CatchAsyncError(async (req, res, next) => {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }

    const user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    res.status(200).json({ message: "Profile Updated Successfully" });
});

const deleteUser = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }
    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    res.status(200).json({
        message: "User Deleted Successfully",
    });
});

const forgotPass = CatchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new errorHandler("Please enter vaild email", 404));
    }
    const token = crypto.randomBytes(20).toString("hex");

    const message = await forgotPassMailTemplate(user, token);
    const isTokenExists = await forgotPassModel.findOne({ user });


    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });




    await transporter.sendMail({
        from: `Software Vala <${process.env.SMTP_USERNAME}>`,
        to: email,
        subject: "Password Reset Mail",
        text: "",
        html: message,
    });



    const expireDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    if (isTokenExists) {
        isTokenExists.token = token;
        isTokenExists.expireDate = expireDate;
        isTokenExists.save();
        return res.status(200).json({
            message: "Recovery Mail Sent",
        });
    }

    await forgotPassModel.create({ user, token, expireDate });

    res.status(200).json({
        message: "Recovery Mail Sent",
    });
});

const resetTokenVerify = CatchAsyncError(async (req, res, next) => {
    const token = req.params.token;
    const result = await forgotPassModel.findOne({ token });

    if (!result) {
        return res.status(404).json({
            message: "Can't find this token please try again",
            isTokenExists: false,
        });
    }
    return res.status(200).json({
        isTokenExists: true,
    });
});

const resetPassword = CatchAsyncError(async (req, res, next) => {
    const token = req.params.token;

    const { password, c_password } = req.body;

    if (c_password !== password) {
        return next(
            new errorHandler("Password and confirm password not matched", 200)
        );
    }

    const result = await forgotPassModel.findOne({ token });
    if (!result) {
        return next(
            new errorHandler("Can't find this token please try again", 404)
        );
    }

    const user = await userModel.findById(result.user);
    user.password = password;

    await user.save();
    await forgotPassModel.findByIdAndDelete(user._id);

    res.status(200).json({
        message: "Password reset successfully",
    });
});

const updatePassword = CatchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    const { password, cPassword, newPassword } = req.body;

    const user = await userModel.findById(_id).select("password");
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }
    const passwordMatched = await user.comparePass(password);

    if (!passwordMatched) {
        return next(new errorHandler("Old Password Not Matched", 404));
    }

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    if (newPassword != cPassword) {
        return next(
            new errorHandler("Password And Confirm Password Not Matched", 200)
        );
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        message: "Password Changed Successfully",
    });
});



export {
    createUser,
    loginUser,
    userLogout,
    getUserProfile,
    updateUser,
    getAllUser,
    updateUserAdmin,
    getUserAdmin,
    deleteUser,
    forgotPass,
    resetTokenVerify,
    resetPassword,
    updatePassword,
}