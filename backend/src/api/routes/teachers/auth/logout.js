"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutTeacher = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.logoutTeacher = router.post("/teacher/logout", (0, express_async_handler_1.default)(async (req, res, next) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
}));
exports.default = router;
