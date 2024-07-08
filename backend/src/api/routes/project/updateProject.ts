import express, { NextFunction, Request, Response } from "express";
import { PrismaClient, ProjectType } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import {
  authenticateSPTeacher,
  authenticateTeacher,
  authenticateToken,
} from "../../_shared/middleware/verifyToken";

const prisma = new PrismaClient();
const router = express.Router();

interface ProjectUpdateData {
  title?: string;
  description?: string;
  githubLink?: string | null;
  requirements?: string[];
  projectType?: ProjectType;
  problemStatement?: string | null;
  technologiesUsed?: string[];
}

export const updateProject = router.put(
  "/projects/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        githubLink,
        projectType,
        requirements,
        problemStatement,
        technologiesUsed,
      }: ProjectUpdateData = req.body;

      // Fetch the project from the database by ID
      let project = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      // If the project is not found, return a 404 response
      if (!project) throw new Error("Project not found.");

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
          requirements: requirements || project.requirements,
          problemStatement: problemStatement || project.problemStatement,
          technologiesUsed: technologiesUsed || project.technologiesUsed,
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

export const updateProjectStatus = router.patch(
  "/projects/:id/status",
  authenticateTeacher,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) throw new Error("Project not found.");
    // Update the project status
    project = await prisma.project.update({
      where: { id },
      data: {
        status,
      },
    });

    res.status(200).json({
      project,
    });
  })
);

export const updateProjectTeamMembers = router.put(
  "/projects/:id/team-members",
  authenticateToken,
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { teamMembers } = req.body;

      // Format team members data to match StudentWhereUniqueInput
      const formattedTeamMembers = teamMembers.map((memberId: string) => ({
        userId: memberId,
      }));
      // Fetch the project from the database by ID
      let project = await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          teamMembers: true,
        },
      });
      if (!project) throw new Error("Project not found.");

      // Update the team members for the project
      project = await prisma.project.update({
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
    }
  )
);

export const updateProjectMentors = router.put(
  "/projects/:id/mentors",
  authenticateTeacher,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { mentors } = req.body;

    const formattedMentors = mentors.map((memberId: string) => ({
      userId: memberId,
    }));

    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        mentors: true,
      },
    });

    if (!project) throw new Error("Project not found.");

    // Update the mentors for the project
    project = await prisma.project.update({
      where: { id },
      data: {
        mentors: {
          set: formattedMentors,
        },
      },
      include: {
        mentors: true,
      },
    });

    res.status(200).json({
      project,
    });
  })
);

export const updateProjectTAs = router.put(
  "/projects/:id/class-coordinator",
  authenticateSPTeacher,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { classCoordinator } = req.body;
    console.log("hellos")
    const formattedTAs = classCoordinator.map((memberId: string) => ({
      userId: memberId,
    }));

    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        classCoordinator: true,
      },
    });

    if (!project) throw new Error("Project not found.");

    // Update the teaching assistants for the project
    project = await prisma.project.update({
      where: { id },
      data: {
        classCoordinator: {
          set: formattedTAs,
        },
      },
      include: {
        classCoordinator: true,
      },
    });

    res.status(200).json({
      project,
    });
  })
);
