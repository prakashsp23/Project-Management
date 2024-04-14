import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom interface to extend the Express Request interface
interface CustomRequest<T> extends Request {
  user?: T; // Define a user property to hold the decoded user information
}

const prisma = new PrismaClient();

// Middleware function to verify JWT token
export const authenticateToken = async (
  req: CustomRequest<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      // If token is not provided, return a 401 Unauthorized response
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the token
    // jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    //   if (err) {
    //     // If token verification fails, return a 403 Forbidden response
    //     return res.status(403).json({ error: "Forbidden: Invalid token" });
    //   }
    //   // If token is valid, attach the decoded user information to the request object
    //   req.user = user;
    //   // Proceed to the next middleware or route handler
    //   next();
    // });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
  } catch (error) {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};

// Middleware to skip token authentication for certain routes
export const skipTokenAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const skipRoutes = ["/student/register", "/student/auth", "/student/logout"];
  if (skipRoutes.includes(req.path)) {
    return next();
  }
  next();
};
