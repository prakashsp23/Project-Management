import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const getTeacherDetailsById = router.get(
  "/teacher/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const data = await prisma.teacher.findUnique({
      where: {
        userId: id,
      },
      include: {
        profile: true,
        projectsAsCC: true,
        projectsAsMentor: true,
      },
    });

    res.status(201).json({
      data,
    });
  })
);

export default router;
