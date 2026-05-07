export interface DeviceStatePayload {
  deviceId: string;

  deviceName: string;

  protectionEnabled: boolean;

  lastSeen: string;
}

export interface FamilyMemberPayload {
  memberId: string;

  memberName: string;

  role: "parent" | "child";

  devices: DeviceStatePayload[];
}

export interface FamilySyncPayload {
  familyId: string;

  members: FamilyMemberPayload[];

  updatedAt: string;
}
