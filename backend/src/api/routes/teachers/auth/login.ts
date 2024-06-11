import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, TeacherRole } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

interface ReqBody {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: TeacherRole;
}

export const loginTeacher = router.post(
  "/teacher/auth",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: ReqBody = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { username },
      include: { profile: true },
    });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const validPassword = await bcrypt.compare(password, teacher.password);
    // Create the student record in the database
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: teacher.userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // Update lastSignedIn timestamp
    await prisma.teacher.update({
      where: { userId: teacher.userId },
      data: { lastSignedIn: new Date() },
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 30 * 24 * 3600 * 1000,
    });

    res.json({
      teacher,
    });
  })
);

export default router;
