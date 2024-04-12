import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const createProject = router.post(
  "/projects",
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        description,
        teamLeaderId,
        teamMembersIds,
        classCoordinatorId,
        problemStatement,
        githubLink,
        technologiesUsed,
        projectType,
      } = req.body;

      // Check if teamMembersIds is provided and is an array
      let data: any = {
        title,
        description,
        teamLeaderId,
        classCoordinatorId,
        projectType,
      };

      if (teamMembersIds) {
        if (!Array.isArray(teamMembersIds)) {
          return res
            .status(400)
            .json({ error: "teamMembersIds must be an array" });
        }

        // Ensure teamMembersIds is an array of strings
        if (teamMembersIds.some((id) => typeof id !== "string")) {
          return res
            .status(400)
            .json({ error: "teamMembersIds must contain only string values" });
        }

        // Connect teamMembers if teamMembersIds is provided
        data.teamMembers = {
          connect: teamMembersIds.map((id: string) => ({ userId: id })),
        };
      }

      // Optional fields
      if (problemStatement) data.problemStatement = problemStatement;
      if (githubLink) data.githubLink = githubLink;
      if (technologiesUsed && technologiesUsed.length > 0) {
        data.technologiesUsed = technologiesUsed;
      }

      // Create the project record in the database
      const createdProject = await prisma.project.create({
        data,
      });

      res.status(201).json({
        project: createdProject,
        message: "Project created successfully",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
