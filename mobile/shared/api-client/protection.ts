import { api } from "./api";

export const scanContent = async (
  text: string
) => {
  const response = await api.post(
    "/protection/scan",
    {
      text
    }
  );

  return response.data;
};
