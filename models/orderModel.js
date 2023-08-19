import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "undone",
      enum: ["done", "undone"],
    },
    distanceStart: {
      type: Number,
      default: 0,
    },
    distanceEnd: {
      type: Number,
      default: 0,
    },
    pickupTime: {
      type: Date, // Timestamp for when the rider takes the bike
    },
    returnTime: {
      type: Date, // Timestamp for when the rider returns the bike
    },
    nftTokenValue: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
