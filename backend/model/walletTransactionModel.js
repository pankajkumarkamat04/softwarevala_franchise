import mongoose, { Schema } from "mongoose";

const walletTransactionSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        walletID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "wallet",
        },
        beforeAmount: {
            type: Number,
            required: true,
        },
        afterAmount: {
            type: Number,
            required: true,
        },
        transactionName: {
            type: String
        },
        transactionMethod: {
            type: String
        },
        transactionDetail:
        {

            transactionAmount: {
                type: Number
            },
            transactionDate: {
                type: Date
            },
            transactionId: {
                type: String
            }
        }
    },
    { timestamps: true }
);

export default mongoose.model("walletTransaction", walletTransactionSchema);
