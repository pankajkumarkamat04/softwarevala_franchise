import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        transactionDetail: [
            {
                transactionId: {
                    type: String
                },
                transactionAmount: {
                    type: Number
                },
                transactionDate: {
                    type: Date
                }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("wallet", walletSchema);
