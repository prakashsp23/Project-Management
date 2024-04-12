import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export const loginStudent = router.post(
  "/login",
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const student = await prisma.student.findUnique({
        where: { username },
        include: { profile: true },
      });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const validPassword = await bcrypt.compare(password, student.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      const token = jwt.sign(
        { userId: student.userId },
        process.env.JWT_SECRET
      );

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
        // success: true,
        // res: res,
        // code: 200,
        // message: `Signed in successfully.`,
        student,
        token,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
