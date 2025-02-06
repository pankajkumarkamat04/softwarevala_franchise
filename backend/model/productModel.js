import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [1, "Price must be 1 or above"],
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        noOfReview: {
            type: Number,
            required: true,
        },
        images: [
            {
                path: {
                    type: String,
                    required: true,
                },
                filename: {
                    type: String,
                    required: true,
                },
            },
        ],
        file: {
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sellerName: {
            type: String,
            required: true,
        },
        featureProduct: {
            type: String,
            enum: ["Yes", "No"],
            default: "No"
        }

    },
    { timestamps: true }
);

export default mongoose.model("product", productSchema);
