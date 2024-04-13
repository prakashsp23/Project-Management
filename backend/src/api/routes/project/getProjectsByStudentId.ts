import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

export const getProjectByStudentUserId = router.get(
  "/projects/student/:userId",
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
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
        throw new Error("No project found");
      }

      // Return the project where the student is the team leader if found
      if (projectAsLeader) {
        res.status(200).json({ project: projectAsLeader });
      }

      // Return the project where the student is a team member if found
      if (projectAsMember) {
        res.status(200).json({ project: projectAsMember });
      }
    }
  )
);

export default router;
