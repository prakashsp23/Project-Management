import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import {
  authenticateToken,
  authenticateUser,
} from "../../_shared/middleware/verifyToken";

const prisma = new PrismaClient();
const router = express.Router();

export const getProjectById = router.get(
  "/projects/:id",
  authenticateUser,
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Fetch the project from the database by ID
      const project = await prisma.project.findUnique({
        where: {
          id,
        },
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

      // If the project is not found, return a 404 response
      if (!project) {
        throw new Error("Project not found");
      }

      res.status(200).json({
        project,
      });
    }
  )
);

export default router;
