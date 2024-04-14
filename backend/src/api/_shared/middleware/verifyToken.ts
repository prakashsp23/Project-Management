import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Middleware function to verify JWT token
export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the JWT token from the Authorization header
    let token: string;
    token = req?.cookies?.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const student = await prisma.student.findUnique({
        where: {
          userId: decoded["userId"],
        },
      });

      if (!student) {
        return res.status(401).json({ error: "Student not found" });
      }

      req.user = student;
      next();
    } else {
      // If token is not provided, return a 401 Unauthorized response
      return res.status(401).json({ error: "Unauthorized: Login required" });
    }
  } catch (error) {
    return res.status(403).json({ error });
  }
};
