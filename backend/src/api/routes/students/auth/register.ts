import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const registerStudent = router.post(
  "/student/register",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      urn,
      crn,
      semester,
      graduationDate,
    } = req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    // If the email already exists, throw an error
    if (existingStudent) {
      throw new Error("Email already in use");
    }

    // Create the student record in the database
    const createdStudent = await prisma.student.create({
      data: {
        email,
        username,
        password: hashedPassword,
        lastSignedIn: new Date(), // Initialize lastSignedIn with current time
        profile: {
          create: {
            firstName,
            lastName,
            URN: urn,
            CRN: crn,
            semester,
            graduationDate,
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
      { userId: createdStudent.userId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 3600 * 1000,
    });

    res.status(201).json({
      student: createdStudent,
      token,
    });
  })
);

export default router;
