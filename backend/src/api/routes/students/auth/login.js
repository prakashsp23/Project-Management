"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStudent = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.loginStudent = router.post("/student/auth", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { username, password } = req.body;
    const student = await prisma.student.findUnique({
        where: { username },
        include: { profile: true },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const validPassword = await bcrypt_1.default.compare(password, student.password);
    if (!validPassword) {
        throw new Error("Invalid password");
    }
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jsonwebtoken_1.default.sign({ userId: student.userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    // Update lastSignedIn timestamp
    await prisma.student.update({
        where: { userId: student.userId },
        data: { lastSignedIn: new Date() },
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 30 * 24 * 3600 * 1000,
    });
    res.json({
        student,
    });
}));
exports.default = router;
