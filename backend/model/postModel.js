import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "user",
            },
            name: {
                type: String,
                required: true,
            }
        },
        image: {
            path: {
                type: String,
                required: true,
            },
            filename: {
                type: String,
                required: true,
            },
        },
        category: {
            name: {
                type: String,
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "category",
            },
        },
        subCategory: {
            name: {
                type: String,
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "category",
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("post", postSchema);
