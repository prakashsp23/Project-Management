import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import {
  authenticateToken,
  authenticateUser,
} from "../../_shared/middleware/verifyToken";

const prisma = new PrismaClient();
const router = express.Router();

export const getAllProjects = router.get(
  "/projects",
  authenticateUser,
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Fetch all projects from the database
      const projects = await prisma.project.findMany({
        include: {
          teamMembers: {
            include: {
              profile: true,
            },
          },
          mentors: {
            include: {
              profile: true,
            },
          },
          classCoordinator: {
            include: {
              profile: true,
            },
          },
          teamLeader: {
            include: {
              profile: true,
            },
          },
        },
      });

      res.status(200).json({
        projects,
      });
    }
  )
);

export default router;
