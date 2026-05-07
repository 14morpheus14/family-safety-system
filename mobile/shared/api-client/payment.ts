import { api } from "./api";

export const createPaymentOrder =
  async (
    amount: number
  ) => {
    const response =
      await api.post(
        "/payments/create-order",
        {
          amount
        }
      );

    return response.data;
  };
