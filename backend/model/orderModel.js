import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        billingInfo: {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phoneNo: {
                type: Number,
            },
            address: {
                type: String,
            },
            pinCode: {
                type: Number,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
        },
        orderItems:
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        },
        productInfo: {
            serverLogin: {
                type: String,
                required: true,
            },
            serverUsername: {
                type: String,
                required: true,
            },
            serverPassword: {
                type: String,
                required: true,
            },
            websiteName: {
                type: String,
                required: true,
            },
            productNotes: {
                type: String
            },
            websiteLogo: {
                path: {
                    type: String,
                },
                filename: {
                    type: String,
                },
            },
        },
        priceInfo: {
            price: {
                type: Number,
                required: true,
            },
            discountAmount: {
                type: Number,
            },
            discountPrice: {
                type: Number,
            }
        },
        paymentInfo: {
            paymentStatus: {
                type: String,
                required: true,
                enum: ["Paid", "Not paid"],
            },
            paymentTransactionId: {
                type: String,
            },
            paymentMethod: {
                type: String,
            },
            paymentTimeDate: {
                type: String
            }
        },
        orderStatus: {
            type: String,
            required: true,
            enum: [
                "Cancelled",
                "Payment Failed",
                "Pending",
                "Processing",
                "Assigned",
                "Waiting",
                "Testing",
                "Delivered",
            ],
        },
        userInfo: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            userName: {
                type: String,
            },
        },
        developerInfo: {
            developerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            developerName: {
                type: String,
            },
        }

    },
    { timestamps: true }
);

export default mongoose.model("order", orderSchema);
