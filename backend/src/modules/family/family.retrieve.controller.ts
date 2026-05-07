import {
  Request,
  Response
} from "express";

import prisma from "../../config/db";

export const getFamilySyncState =
  async (
    _req: Request,
    res: Response
  ) => {
    const familySyncStates =
      await prisma.familySync.findMany({
        include: {
          members: {
            include: {
              devices: true
            }
          }
        },

        orderBy: {
          createdAt: "desc"
        }
      });

    return res.status(200).json({
      success: true,

      count:
        familySyncStates.length,

      data:
        familySyncStates
    });
  };
export const getSingleFamilySyncState =
  async (
    req: Request,
    res: Response
  ) => {
    const familyId =
      String(req.params.familyId);
    const familySyncStates =
      await prisma.familySync.findMany({
        where: {
          familyId
        },

        include: {
          members: {
            include: {
              devices: true
            }
          }
        },

        orderBy: {
          createdAt: "desc"
        }
      });

    return res.status(200).json({
      success: true,

      familyId,

      count:
        familySyncStates.length,

      data:
        familySyncStates
    });
  };
