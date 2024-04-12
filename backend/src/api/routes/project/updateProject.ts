import express, { Request, Response } from "express";
import { PrismaClient, ProjectType } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

interface ProjectUpdateData {
  title?: string;
  description?: string;
  githubLink?: string | null;
  projectType?: ProjectType;
  problemStatement?: string | null;
}

export const updateProject = router.put(
  "/projects/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        githubLink,
        projectType,
        problemStatement,
      }: ProjectUpdateData = req.body;

      // Fetch the project from the database by ID
      let project = await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          mentors: true,
          teamMembers: true,
        },
      });

      // If the project is not found, return a 404 response
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Update the project fields with provided data
      project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          title: title || project.title,
          description: description || project.description,
          githubLink: githubLink || project.githubLink,
          projectType: projectType || project.projectType,
          problemStatement: problemStatement || project.problemStatement,
        },
        include: {
          mentors: true,
          teamMembers: true,
        },
      });

      res.status(200).json({
        project,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const updateProjectTeamMembers = router.put(
  "/projects/:id/team-members",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { teamMembers } = req.body;

      // Format team members data to match StudentWhereUniqueInput
      const formattedTeamMembers = teamMembers.map((memberId: string) => ({
        userId: memberId,
      }));

      // Update the team members for the project
      const project = await prisma.project.update({
        where: { id },
        data: {
          teamMembers: {
            set: formattedTeamMembers, // Use 'set' to replace all existing team members
          },
        },
        include: {
          teamMembers: true,
        },
      });

      res.status(200).json({
        project,
      });
    } catch (error) {
      console.error("Error updating project team members:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


export const updateProjectMentors = router.put(
  "/projects/:id/mentors",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { mentors } = req.body;

      // Update the mentors for the project
      const project = await prisma.project.update({
        where: { id },
        data: {
          mentors: {
            set: mentors, // Use 'set' to replace all existing mentors
          },
        },
        include: {
          mentors: true,
        },
      });

      res.status(200).json({
        project,
      });
    } catch (error) {
      console.error("Error updating project mentors:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
