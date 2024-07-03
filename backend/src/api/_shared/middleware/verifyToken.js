"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSPTeacher = exports.authenticateTeacher = exports.authenticateToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Middleware function to verify normal student JWT token
const authenticateToken = async (req, res, next) => {
    try {
        // Get the JWT token from the Authorization header
        let token;
        token = req?.cookies?.jwt;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const student = await prisma.student.findUnique({
                where: {
                    userId: decoded["userId"],
                },
            });
            if (!student) {
                return res.status(401).json({ error: "Student not found" });
            }
            req.user = student;
            next();
        }
        else {
            // If token is not provided, return a 401 Unauthorized response
            return res.status(401).json({ error: "Unauthorized: Login required" });
        }
    }
    catch (error) {
        return res.status(403).json({ error });
    }
};
exports.authenticateToken = authenticateToken;
// Middleware function to verify normal teacher JWT token
const authenticateTeacher = async (req, res, next) => {
    try {
        // Get the JWT token from the Authorization header
        let token;
        token = req?.cookies?.jwt;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const teacher = await prisma.teacher.findUnique({
                where: {
                    userId: decoded["userId"],
                },
            });
            if (!teacher) {
                return res.status(401).json({ error: "teacher not found" });
            }
            req.user = teacher;
            next();
        }
        else {
            // If token is not provided, return a 401 Unauthorized response
            return res.status(401).json({ error: "Unauthorized: Login required" });
        }
    }
    catch (error) {
        return res.status(403).json({ error });
    }
};
exports.authenticateTeacher = authenticateTeacher;
// Middleware function to verify SUPER_ADMIN teacher JWT token
const authenticateSPTeacher = async (req, res, next) => {
    try {
        // Get the JWT token from the Authorization header
        let token;
        token = req?.cookies?.jwt;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const teacher = await prisma.teacher.findUnique({
                where: {
                    userId: decoded["userId"],
                },
            });
            if (!teacher || teacher.role !== "SUPER_ADMIN") {
                return res
                    .status(401)
                    .json({
                    error: "Teacher not found Or Teacher does not have permission.",
                });
            }
            req.user = teacher;
            next();
        }
        else {
            // If token is not provided, return a 401 Unauthorized response
            return res.status(401).json({ error: "Unauthorized: Login required" });
        }
    }
    catch (error) {
        return res.status(403).json({ error });
    }
};
exports.authenticateSPTeacher = authenticateSPTeacher;
