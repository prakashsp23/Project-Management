import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export const logoutStudent = router.post(
  "/logout",
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      // Delete all tokens associated with the user
      await prisma.studentToken.deleteMany({
        where: { userId },
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
