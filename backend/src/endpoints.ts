import express, { Request, Response } from "express";
import { registerStudent } from "./api/routes/students/auth/register";
import { loginStudent } from "./api/routes/students/auth/login";
import { logoutStudent } from "./api/routes/students/auth/logout";
import { createProject } from "./api/routes/project/createProject";
import { getAllProjects } from "./api/routes/project/getAllProjects";
import { getProjectById } from "./api/routes/project/getProjectById";
import {
  updateProject,
  updateProjectMentors,
  updateProjectTeamMembers,
} from "./api/routes/project/updateProject";
import { getProjectByStudentUserId } from "./api/routes/project/getProjectsByStudentId";
import { authenticateToken } from "./api/_shared/middleware/verifyToken";

const API = "";

export const endpoints = async (app: express.Application) => {
  // Students
  app.use(API, registerStudent);
  app.use(API, loginStudent);
  app.use(API, logoutStudent);

  // Project
  app.use(API, createProject);
  app.use(API, updateProject);
  app.use(API, updateProjectTeamMembers);
  app.use(API, updateProjectMentors);

  app.use(API, authenticateToken, getAllProjects);
  app.use(API, getProjectById);
  app.use(API, getProjectByStudentUserId);

  app.get("/", async (req: Request, res: Response) => {
    // expressListRoutes(app, { prefix: '/' })
    return res.json({
      res: res,
      code: 200,
      data: null,
      success: true,
      message: "Server is up and running!.",
    });
    // res.json(app._router.stack);
  });
};
