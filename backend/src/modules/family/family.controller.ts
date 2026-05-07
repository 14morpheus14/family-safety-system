import {
  Request,
  Response
} from "express";

import prisma from "../../config/db";

import {
  familySyncSchema
} from "../../contracts/validators/family.validator";

import {
  isSupportedSyncVersion,
  getLatestSyncVersion
} from "../../compatibility/sync-version.compatibility";

export const syncFamilyState =
  async (
    req: Request,
    res: Response
  ) => {
    const {
      version
    } = req.body;

    if (
      !version ||
      !isSupportedSyncVersion(
        version
      )
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Unsupported synchronization version",

        supportedVersions:
          getLatestSyncVersion()
      });
    }

    const validationResult =
      familySyncSchema.safeParse(
        req.body
      );

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid family sync payload",

        errors:
          validationResult.error.flatten()
      });
    }

    const payload =
      validationResult.data;

    const latestFamilySync =
      await prisma.familySync.findFirst({
        where: {
          familyId:
            payload.familyId
        },

        orderBy: {
          updatedAt: "desc"
        }
      });

    if (
      latestFamilySync &&
      new Date(payload.updatedAt)
        <= latestFamilySync.updatedAt
    ) {
      return res.status(409).json({
        success: false,

        message:
          "Replay or stale synchronization detected"
      });
    }

    const createdFamilySync =
      await prisma.familySync.create({
        data: {
          familyId:
            payload.familyId,

          updatedAt:
            new Date(
              payload.updatedAt
            ),

          members: {
            create:
              payload.members.map(
                (member) => ({
                  memberId:
                    member.memberId,

                  memberName:
                    member.memberName,

                  role:
                    member.role,

                  devices: {
                    create:
                      member.devices.map(
                        (device) => ({
                          deviceId:
                            device.deviceId,

                          deviceName:
                            device.deviceName,

                          protectionEnabled:
                            device.protectionEnabled,

                          lastSeen:
                            new Date(
                              device.lastSeen
                            )
                        })
                      )
                  }
                })
              )
          }
        },

        include: {
          members: {
            include: {
              devices: true
            }
          }
        }
      });

    return res.status(200).json({
      success: true,

      message:
        "Family state synchronized",

      data:
        createdFamilySync
    });
  };
