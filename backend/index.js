import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import DBConnect from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import orderRoute from "./routes/orderRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import adminRoute from "./routes/adminRoute.js"
import extraRoute from "./routes/extraRoute.js"
import settingRoute from "./routes/settingRoute.js"
import postRoute from "./routes/postRoute.js"
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";



const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, `./config/.env`) })

DBConnect()

const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser());

app.use("/api/v1/user", userRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/extra", extraRoute)
app.use("/api/v1/setting", settingRoute)
app.use("/api/v1/post", postRoute)

app.use(errorMiddleware)
app.use("/assets", express.static(path.join(__dirname, "./assets")));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
    try {
        console.log(`Server is runing on port ${port}`);
    } catch (error) {
        console.log(error);

    }
})