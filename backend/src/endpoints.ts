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
  updateProjectStatus,
  updateProjectTAs,
  updateProjectTeamMembers,
} from "./api/routes/project/updateProject";
import { getProjectByStudentUserId } from "./api/routes/project/getProjectsByStudentId";
import { registerTeacher } from "./api/routes/teachers/auth/register";
import { loginTeacher } from "./api/routes/teachers/auth/login";
import { logoutTeacher } from "./api/routes/teachers/auth/logout";
import { getStudentDetailsById } from "./api/routes/students/getStudentDetailsById";
import { getTeacherDetailsById } from "./api/routes/teachers/getTeacherDetailsById";

const API = "";

export const endpoints = async (app: express.Application) => {
  // Students
  app.use(API, registerStudent);
  app.use(API, loginStudent);
  app.use(API, logoutStudent);
  app.use(API, getStudentDetailsById);
  // Teachers
  app.use(API, registerTeacher);
  app.use(API, loginTeacher);
  app.use(API, logoutTeacher);
  app.use(API, getTeacherDetailsById);

  // Project
  app.use(API, createProject);
  app.use(API, updateProject);
  app.use(API, updateProjectStatus);
  app.use(API, updateProjectTeamMembers);
  app.use(API, updateProjectMentors);
  app.use(API, updateProjectTAs);

  app.use(API, getAllProjects);
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
