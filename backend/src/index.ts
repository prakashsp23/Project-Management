import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { endpoints } from "./endpoints";
import { authenticateToken } from "./api/_shared/middleware/verifyToken";

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

// Middleware to skip token authentication for certain routes
const skipTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const skipRoutes = ["/register", "/login", "/logout"];
  if (skipRoutes.includes(req.path)) {
    return next();
  }
  next();
};

app.use(skipTokenAuth); // Apply the skipTokenAuth middleware after defining endpoints

// Middleware to authenticate token
app.use(authenticateToken); // Apply the authenticateToken middleware after defining endpoints

console.log(process.env.JWT_SECRET);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
