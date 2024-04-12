import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const registerStudent = router.post(
  "/register",
  async (req: Request, res: Response) => {
    try {
      const { email, username, password, firstName, lastName } = req.body;

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Check if the email already exists
      const existingStudent = await prisma.student.findUnique({
        where: {
          email,
        },
      });

      // If the email already exists, return an error response
      if (existingStudent) {
        return res.status(400).json({ error: "Email already in use" });
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
            },
          },
        },
        // include: {
        //   profile: true,
        // },
      });
      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: createdStudent.userId },
        process.env.JWT_SECRET,
        { expiresIn: "90d" }
      );

      // Store the token in the Token table
      await prisma.studentToken.create({
        data: {
          userId: createdStudent.userId,
          token,
        },
      });

      res.status(201).json({
        // success: true,
        // res: res,
        // code: 200,
        // message: `Student user created successfully.`,
        student: createdStudent,
        token,
      });
    } catch (error) {
      console.error("Error registering student:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
