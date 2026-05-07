export const getFamilySyncState =
  async (
    familyId: string
  ) => {
    const response =
      await fetch(
        `http://localhost:5000/family/${familyId}/sync`,
        {
          headers: {
            Authorization:
              "Bearer validtoken"
          }
        }
      );

    return response.json();
  };
