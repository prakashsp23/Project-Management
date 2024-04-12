import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export const getAllProjects = router.get(
  "/projects",
  async (req: Request, res: Response) => {
    try {
      // Fetch all projects from the database
      const projects = await prisma.project.findMany({
        include: {
          teamMembers: true,
          mentors: true,
        },
      });

      res.status(200).json({
        projects,
      });
    } catch (error) {
      console.error("Error getting all projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
