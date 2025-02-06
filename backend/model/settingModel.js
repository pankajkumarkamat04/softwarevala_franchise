import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    value: {
        type: String,
        requried: true
    }

}, { timestamps: true })

export default mongoose.model("setting", settingSchema)