"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
const register_1 = require("./api/routes/students/auth/register");
const login_1 = require("./api/routes/students/auth/login");
const logout_1 = require("./api/routes/students/auth/logout");
const createProject_1 = require("./api/routes/project/createProject");
const getAllProjects_1 = require("./api/routes/project/getAllProjects");
const getProjectById_1 = require("./api/routes/project/getProjectById");
const updateProject_1 = require("./api/routes/project/updateProject");
const getProjectsByStudentId_1 = require("./api/routes/project/getProjectsByStudentId");
const register_2 = require("./api/routes/teachers/auth/register");
const login_2 = require("./api/routes/teachers/auth/login");
const logout_2 = require("./api/routes/teachers/auth/logout");
const API = "";
const endpoints = async (app) => {
    // Students
    app.use(API, register_1.registerStudent);
    app.use(API, login_1.loginStudent);
    app.use(API, logout_1.logoutStudent);
    // Teachers
    app.use(API, register_2.registerTeacher);
    app.use(API, login_2.loginTeacher);
    app.use(API, logout_2.logoutTeacher);
    // Project
    app.use(API, createProject_1.createProject);
    app.use(API, updateProject_1.updateProject);
    app.use(API, updateProject_1.updateProjectStatus);
    app.use(API, updateProject_1.updateProjectTeamMembers);
    app.use(API, updateProject_1.updateProjectMentors);
    app.use(API, updateProject_1.updateProjectTAs);
    app.use(API, getAllProjects_1.getAllProjects);
    app.use(API, getProjectById_1.getProjectById);
    app.use(API, getProjectsByStudentId_1.getProjectByStudentUserId);
    app.get("/", async (req, res) => {
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
exports.endpoints = endpoints;
