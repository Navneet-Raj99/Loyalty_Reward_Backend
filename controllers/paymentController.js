// import { instance } from "../server";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import Razorpay from "razorpay";
import { log } from "console";
import orderModel from "../models/orderModel.js";
import _ from "lodash";
import {hashAmount, compareAmount} from "../helpers/tokenHelper.js"
// dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    console.log("====================================");
    console.log(options);
    console.log("====================================");
    const order = await instance.orders.create(options);
    console.log("after odered");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log("checkout error", err);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    console.log("payvaavduavdu", req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } =
    req.body;

  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    let totalAmountPayable = 0;
    cart.map((e) => {
      totalAmountPayable+=e.price;
    });
    // const nftTokenValue = await hashAmount(_.toString(totalAmountPayable));
    const order = new orderModel({
      products: cart,
      payment: req.body,
      buyer: req.user._id,
      nftTokenValue: totalAmountPayable*0.1
    }).save();

    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    res.json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
  } catch (err) {
    console.log(err);
  }
};
