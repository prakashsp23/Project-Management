import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export const getProjectById = router.get(
  "/projects/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Fetch the project from the database by ID
      const project = await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          teamMembers: true,
          mentors: true,
        },
      });

      // If the project is not found, return a 404 response
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.status(200).json({
        project,
      });
    } catch (error) {
      console.error("Error getting project by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
