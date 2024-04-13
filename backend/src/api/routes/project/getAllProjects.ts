import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

export const getAllProjects = router.get(
  "/projects",
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Fetch all projects from the database
      const projects = await prisma.project.findMany({
        include: {
          teamMembers: true,
          mentors: true,
        },
      });

      res.status(200).json({
        projects,
      });
    }
  )
);

export default router;
