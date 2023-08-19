import mongoose from "mongoose";

const userSellerSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers"
    },
    amount: {
        type: Number,
        required: true
    },
    rewardsArray: {
        type: Array
    }
  },
  { timestamps: true }
);

export default mongoose.model("userSeller", userSellerSchema);
