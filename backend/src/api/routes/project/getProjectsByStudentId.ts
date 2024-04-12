import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

export const getProjectByStudentUserId = router.get(
  "/projects/student/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      // Find the project where the student is the team leader
      const projectAsLeader = await prisma.project.findFirst({
        where: {
          teamLeaderId: userId,
        },
        include: {
          teamMembers: true,
          mentors: true,
        },
      });

      // Find the project where the student is a team member
      const projectAsMember = await prisma.project.findFirst({
        where: {
          teamMembers: {
            some: {
              userId,
            },
          },
        },
      });

      // If the student is neither a team leader nor a team member in any project
      if (!projectAsLeader && !projectAsMember) {
        return res.status(404).json({ message: "No project found" });
      }

      // Return the project where the student is the team leader if found
      if (projectAsLeader) {
        return res.status(200).json({ project: projectAsLeader });
      }

      // Return the project where the student is a team member if found
      if (projectAsMember) {
        return res.status(200).json({ project: projectAsMember });
      }
    } catch (error) {
      console.error("Error fetching project by user ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
