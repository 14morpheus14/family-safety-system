import { api } from "./api";

export const syncFamilyState =
  async (
    payload: any
  ) => {
    const response =
      await api.post(
        "/family/sync",
        payload
      );

    return response.data;
  };

export const getFamilySyncState =
  async (
    familyId: string
  ) => {
    const response =
      await api.get(
        `/family/${familyId}/sync`
      );

    return response.data;
  };
