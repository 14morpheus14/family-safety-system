import { api } from "./api";

import {
  setToken
} from "../utils/token";

export const loginUser =
  async (
    email: string,
    password: string
  ) => {
    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

    const token =
      response.data.token;

    if (token) {
      setToken(token);
    }

    return response.data;
  };
