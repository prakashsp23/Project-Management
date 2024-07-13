import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import { authenticateToken } from "../../_shared/middleware/verifyToken";

const prisma = new PrismaClient();
const router = express.Router();

export const getAllProjects = router.get(
  "/projects",
  // authenticateToken,
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Fetch all projects from the database
      const projects = await prisma.project.findMany({
        include: {
          teamMembers: true,
          mentors: true,
          classCoordinator: true,
        },
      });

      res.status(200).json({
        projects,
      });
    }
  )
);

export default router;
