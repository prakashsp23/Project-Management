import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, TeacherRole } from "@prisma/client";
import asyncHandler from "express-async-handler";

dotenv.config();

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

export const registerTeacher = router.post(
  "/teacher/register",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, firstName, lastName, role }: ReqBody =
      req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    // If the email already exists, throw an error
    if (existingTeacher) {
      throw new Error("Email already in use");
    }

    // Create the student record in the database
    const createdTeacher = await prisma.teacher.create({
      data: {
        email,
        username,
        role,
        password: hashedPassword,
        lastSignedIn: new Date(), // Initialize lastSignedIn with current time
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
    });

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: createdTeacher.userId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 3600 * 1000,
    });

    res.status(201).json({
      teacher: createdTeacher,
      token,
    });
  })
);

export default router;
