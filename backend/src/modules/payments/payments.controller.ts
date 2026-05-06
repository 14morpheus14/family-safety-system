import { Request, Response } from "express";
import crypto from "crypto";

import razorpay from "../../services/razorpay.service";

export const createOrder = async (
  _req: Request,
  res: Response
) => {
  try {
    const options = {
      amount: 50000,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order",
      error
    });
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(body.toString())
      .digest("hex");

    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Invalid payment signature"
      });
    }

    return res.status(200).json({
      message: "Payment verified successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Payment verification failed",
      error
    });
  }
};
