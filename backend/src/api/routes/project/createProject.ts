import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import { authenticateToken } from "../../_shared/middleware/verifyToken";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

export const createProject = router.post(
  "/projects",
  authenticateToken,
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
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
          throw new Error("teamMembersIds must be an array");
        }

        // Ensure teamMembersIds is an array of strings
        if (teamMembersIds.some((id) => typeof id !== "string")) {
          throw new Error("teamMembersIds must contain only string values");
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
    }
  )
);
