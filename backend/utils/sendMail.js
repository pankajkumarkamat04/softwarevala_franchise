import nodemailer from "nodemailer";

const mailHost = await settingModel.findOne({ name: "mailHost" })
const mailPort = await settingModel.findOne({ name: "mailPort" })
const mailUsername = await settingModel.findOne({ name: "mailUsername" })
const mailPassword = await settingModel.findOne({ name: "mailPassword" })

const transporter = nodemailer.createTransport({
    host: mailHost,
    port: Number(mailPort),
    secure: true,
    auth: {
        user: mailUsername,
        pass: mailPassword,
    },
});



const sendMail = async (email, subject, message, plainText) => {
    await transporter.sendMail({
        from: `"Zep Basket" <${process.env.SMTP_USERNAME}>`,
        to: email,
        subject,
        text: "",
        html: message,
    });
};

export default sendMail;