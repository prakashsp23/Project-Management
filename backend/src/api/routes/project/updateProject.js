"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectTAs = exports.updateProjectMentors = exports.updateProjectTeamMembers = exports.updateProjectStatus = exports.updateProject = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../../_shared/middleware/verifyToken");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.updateProject = router.put("/projects/:id", verifyToken_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, githubLink, projectType, requirements, problemStatement, technologiesUsed, } = req.body;
        // Fetch the project from the database by ID
        let project = await prisma.project.findUnique({
            where: {
                id,
            },
        });
        // If the project is not found, return a 404 response
        if (!project)
            throw new Error("Project not found.");
        // Update the project fields with provided data
        project = await prisma.project.update({
            where: {
                id,
            },
            data: {
                title: title || project.title,
                description: description || project.description,
                githubLink: githubLink || project.githubLink,
                projectType: projectType || project.projectType,
                requirements: requirements || project.requirements,
                problemStatement: problemStatement || project.problemStatement,
                technologiesUsed: technologiesUsed || project.technologiesUsed,
            },
            include: {
                mentors: true,
                teamMembers: true,
            },
        });
        res.status(200).json({
            project,
        });
    }
    catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProjectStatus = router.patch("/projects/:id/status", verifyToken_1.authenticateTeacher, (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
        where: {
            id,
        },
    });
    if (!project)
        throw new Error("Project not found.");
    // Update the project status
    project = await prisma.project.update({
        where: { id },
        data: {
            status,
        },
    });
    res.status(200).json({
        project,
    });
}));
exports.updateProjectTeamMembers = router.put("/projects/:id/team-members", verifyToken_1.authenticateToken, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { teamMembers } = req.body;
    // Format team members data to match StudentWhereUniqueInput
    const formattedTeamMembers = teamMembers.map((memberId) => ({
        userId: memberId,
    }));
    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            teamMembers: true,
        },
    });
    if (!project)
        throw new Error("Project not found.");
    // Update the team members for the project
    project = await prisma.project.update({
        where: { id },
        data: {
            teamMembers: {
                set: formattedTeamMembers, // Use 'set' to replace all existing team members
            },
        },
        include: {
            teamMembers: true,
        },
    });
    res.status(200).json({
        project,
    });
}));
exports.updateProjectMentors = router.put("/projects/:id/mentors", verifyToken_1.authenticateTeacher, (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { mentors } = req.body;
    const formattedMentors = mentors.map((memberId) => ({
        userId: memberId,
    }));
    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            mentors: true,
        },
    });
    if (!project)
        throw new Error("Project not found.");
    // Update the mentors for the project
    project = await prisma.project.update({
        where: { id },
        data: {
            mentors: {
                set: formattedMentors,
            },
        },
        include: {
            mentors: true,
        },
    });
    res.status(200).json({
        project,
    });
}));
exports.updateProjectTAs = router.put("/projects/:id/teacher-assistants", verifyToken_1.authenticateSPTeacher, (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { teacherAssistants } = req.body;
    const formattedTAs = teacherAssistants.map((memberId) => ({
        userId: memberId,
    }));
    // Fetch the project from the database by ID
    let project = await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            teacherAssistants: true,
        },
    });
    if (!project)
        throw new Error("Project not found.");
    // Update the teaching assistants for the project
    project = await prisma.project.update({
        where: { id },
        data: {
            teacherAssistants: {
                set: formattedTAs,
            },
        },
        include: {
            teacherAssistants: true,
        },
    });
    res.status(200).json({
        project,
    });
}));
