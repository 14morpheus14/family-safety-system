export const SUPPORTED_SYNC_VERSIONS =
  [
    "1.0.0",
    "1.1.0",
    "2.0.0"
  ];

export const isSupportedSyncVersion =
  (
    version: string
  ) => {
    return SUPPORTED_SYNC_VERSIONS.includes(
      version
    );
  };

export const getLatestSyncVersion =
  () => {
    return SUPPORTED_SYNC_VERSIONS[
      SUPPORTED_SYNC_VERSIONS.length - 1
    ];
  };
