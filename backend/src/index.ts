import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import {
  authenticateToken,
  skipTokenAuth,
} from "./api/_shared/middleware/verifyToken";
import {
  errorHandler,
  notFound,
} from "./api/_shared/middleware/errorMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors({ origin: "*" }));

// Define a custom interface for Request object to include Socket.io instance
interface CustomRequest extends Request {
  io?: Server;
}

// Middleware to attach Socket.io instance to the Request object
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.io = io;
  return next();
});

// Define API endpoints
endpoints(app);

// Middleware to authenticate token

app.use(skipTokenAuth);

app.use(authenticateToken); // Apply the authenticateToken middleware after defining endpoints

// Erro handling
app.use(errorHandler);
app.use(notFound);

console.log(process.env.JWT_SECRET);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
