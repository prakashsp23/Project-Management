"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectByStudentUserId = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../../_shared/middleware/verifyToken");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.getProjectByStudentUserId = router.get("/projects/student/:userId", verifyToken_1.authenticateToken, (0, express_async_handler_1.default)(async (req, res, next) => {
    const userId = req.params.userId;
    // Find the project where the student is the team leader
    const projectAsLeader = await prisma.project.findFirst({
        where: {
            teamLeaderId: userId,
        },
        include: {
            teamMembers: true,
            mentors: true,
        },
    });
    // Find the project where the student is a team member
    const projectAsMember = await prisma.project.findFirst({
        where: {
            teamMembers: {
                some: {
                    userId,
                },
            },
        },
    });
    // If the student is neither a team leader nor a team member in any project
    if (!projectAsLeader && !projectAsMember) {
        throw new Error("No project found");
    }
    // Return the project where the student is the team leader if found
    if (projectAsLeader) {
        res.status(200).json({ project: projectAsLeader });
    }
    // Return the project where the student is a team member if found
    if (projectAsMember) {
        res.status(200).json({ project: projectAsMember });
    }
}));
exports.default = router;
