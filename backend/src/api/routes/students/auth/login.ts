import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

export const loginStudent = router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const student = await prisma.student.findUnique({
      where: { username },
      include: { profile: true },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const validPassword = await bcrypt.compare(password, student.password);

    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: student.userId }, process.env.JWT_SECRET);

    // Update lastSignedIn timestamp
    await prisma.student.update({
      where: { userId: student.userId },
      data: { lastSignedIn: new Date() },
    });

    // Store the token in the Token table
    await prisma.studentToken.create({
      data: {
        userId: student.userId,
        token,
      },
    });

    res.json({
      student,
      token,
    });
  })
);

export default router;
