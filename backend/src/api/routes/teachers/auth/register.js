"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeacher = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.registerTeacher = router.post("/teacher/register", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, username, password, firstName, lastName, role } = req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Check if the email already exists
    const existingTeacher = await prisma.teacher.findUnique({
        where: {
            email,
        },
    });
    // If the email already exists, throw an error
    if (existingTeacher) {
        throw new Error("Email already in use");
    }
    // Create the student record in the database
    const createdTeacher = await prisma.teacher.create({
        data: {
            email,
            username,
            role,
            password: hashedPassword,
            lastSignedIn: new Date(), // Initialize lastSignedIn with current time
            profile: {
                create: {
                    firstName,
                    lastName,
                },
            },
        },
    });
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: createdTeacher.userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 3600 * 1000,
    });
    res.status(201).json({
        teacher: createdTeacher,
        token,
    });
}));
exports.default = router;