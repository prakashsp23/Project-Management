import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

export const logoutTeacher = router.post(
  "/teacher/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  })
);

export default router;
