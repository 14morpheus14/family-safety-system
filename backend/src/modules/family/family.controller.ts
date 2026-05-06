import { Request, Response } from "express";
import prisma from "../../config/db";

interface AuthRequest extends Request {
  user?: any;
}

export const createFamily = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name } = req.body;

    const family = await prisma.family.create({
      data: {
        name
      }
    });

    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        familyId: family.id
      }
    });

    return res.status(201).json({
      message: "Family created successfully",
      family
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create family",
      error
    });
  }
};

export const getFamily = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    });

    if (!user?.familyId) {
      return res.status(404).json({
        message: "User has no family"
      });
    }

    const family = await prisma.family.findUnique({
      where: {
        id: user.familyId
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            familyId: true,
            createdAt: true
          }
        },
        alerts: true
      }
    });

    return res.status(200).json({
      family
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch family",
      error
    });
  }
};
