"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../../_shared/middleware/verifyToken");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.createProject = router.post("/projects", verifyToken_1.authenticateToken, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, description, teamLeaderId, teamMembersIds, classCoordinatorId, problemStatement, githubLink, technologiesUsed, projectType, } = req.body;
    // Check if teamMembersIds is provided and is an array
    let data = {
        title,
        description,
        teamLeaderId,
        classCoordinatorId,
        projectType,
    };
    if (teamMembersIds) {
        if (!Array.isArray(teamMembersIds)) {
            throw new Error("teamMembersIds must be an array");
        }
        // Ensure teamMembersIds is an array of strings
        if (teamMembersIds.some((id) => typeof id !== "string")) {
            throw new Error("teamMembersIds must contain only string values");
        }
        // Connect teamMembers if teamMembersIds is provided
        data.teamMembers = {
            connect: teamMembersIds.map((id) => ({ userId: id })),
        };
    }
    // Optional fields
    if (problemStatement)
        data.problemStatement = problemStatement;
    if (githubLink)
        data.githubLink = githubLink;
    if (technologiesUsed && technologiesUsed.length > 0) {
        data.technologiesUsed = technologiesUsed;
    }
    // Create the project record in the database
    const createdProject = await prisma.project.create({
        data,
    });
    res.status(201).json({
        project: createdProject,
        message: "Project created successfully",
    });
}));
