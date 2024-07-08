import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const getStudentDetailsById = router.get(
  "/student/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const data = await prisma.student.findUnique({
      where: {
        userId: id,
      },
      include: {
        profile: true,
        projectsAsLeader: true,
        projectsAsMember: true,
      },
    });

    res.status(201).json({
      data,
    });
  })
);

export default router;
