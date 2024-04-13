import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

export const logoutStudent = router.post(
  "/student/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    // Delete all tokens associated with the user
    await prisma.studentToken.deleteMany({
      where: { userId },
    });

    res.status(200).json({ message: "Logout successful" });
  })
);

export default router;
