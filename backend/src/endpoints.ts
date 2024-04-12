import express, { Request, Response } from "express";
import { registerStudent } from "./api/routes/students/auth/register";
import { loginStudent } from "./api/routes/students/auth/login";
import { logoutStudent } from "./api/routes/students/auth/logout";

const API = "";

export const endpoints = async (app: express.Application) => {
  app.use(API, registerStudent);
  app.use(API, loginStudent);
  app.use(API, logoutStudent);

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
