import {
  Request,
  Response,
} from "express";

import {
  createRazorpayOrder,
} from "./payment.service";

export const createOrder =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({
          message:
            "Amount is required",
        });
      }

      const order =
        await createRazorpayOrder(
          amount
        );

      return res.status(200).json(
        order
      );
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Failed to create order",
      });
    }
  };
