"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../../_shared/middleware/verifyToken");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.getProjectById = router.get("/projects/:id", verifyToken_1.authenticateToken, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    // Fetch the project from the database by ID
    const project = await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            teamMembers: true,
            mentors: true,
        },
    });
    // If the project is not found, return a 404 response
    if (!project) {
        throw new Error("Project not found");
    }
    res.status(200).json({
        project,
    });
}));
exports.default = router;
