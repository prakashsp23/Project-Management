import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import cookieParser from "cookie-parser";
import {
  errorHandler,
  notFound,
} from "./api/_shared/middleware/errorMiddleware";
// import { authenticateToken } from "./api/_shared/middleware/verifyToken";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

// Define API endpoints
endpoints(app);
// Erro handling
app.use(errorHandler);
app.use(notFound);

console.log(process.env.JWT_SECRET);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
