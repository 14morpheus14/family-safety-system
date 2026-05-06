import { Request, Response } from "express";
import prisma from "../../config/db";

interface AuthRequest extends Request {
  user?: any;
}

export const createAlert = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, description } = req.body;

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

    const alert = await prisma.alert.create({
      data: {
        title,
        description,
        familyId: user.familyId
      }
    });

    return res.status(201).json({
      message: "Alert created successfully",
      alert
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create alert",
      error
    });
  }
};

export const getAlerts = async (
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

    const alerts = await prisma.alert.findMany({
      where: {
        familyId: user.familyId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({
      alerts
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch alerts",
      error
    });
  }
};
