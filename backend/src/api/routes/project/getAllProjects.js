"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../../_shared/middleware/verifyToken");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.getAllProjects = router.get("/projects", verifyToken_1.authenticateToken, (0, express_async_handler_1.default)(async (req, res, next) => {
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
}));
exports.default = router;
