"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const endpoints_1 = require("./endpoints");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = require("./api/_shared/middleware/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "*" }));
// Define API endpoints
(0, endpoints_1.endpoints)(app);
// Erro handling
app.use(errorMiddleware_1.errorHandler);
app.use(errorMiddleware_1.notFound);
console.log(process.env.JWT_SECRET);
// Start the server
server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
