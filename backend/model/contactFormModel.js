import mongoose, { Schema } from "mongoose";

const contactFormSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    user: {
        name: {
            type: String,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    }

}, { timestamps: true })

export default mongoose.model("contactForm", contactFormSchema)