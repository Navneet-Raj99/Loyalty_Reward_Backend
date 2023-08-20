import mongoose from "mongoose";

const userReferralSchema = new mongoose.Schema(
  {
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    consumerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    referralCode: {
        type: String,
        required: true
    },
    awarded:{
        type: Boolean,
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("userReferral", userReferralSchema);
