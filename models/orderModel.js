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
    pickupTime: {
      type: Date, // Timestamp for when the rider takes the bike
    },
    returnTime: {
      type: Date, // Timestamp for when the rider returns the bike
    },
    addr:{
      type:String
    },
    nftTokenValue: {
      type: Number,
      required: true
    },
    tokenTransID:{
      type: String
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
