import { Request, Response, NextFunction } from "express";
import { sendRes } from "../../../../types/response";
// import { studentUser } from "../../../../prisma/outputs/project";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { appContext } from "../../../../src/context/context";
env.config();

// Define a custom interface to extend the Request type
export interface CustomRequest extends Request {
  user?: iFiveUser;
  io: any;
}

// Middleware to decode and verify Firebase token
export const iFiveUserMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!token) {
      return sendRes({
        res: res,
        code: 401,
        data: null,
        success: false,
        message: "Unauthorized.",
      });
    }
    const user = await appContext.databases.ifive.iFiveUser.findUnique({
      where: {
        id: decoded["user"]["id"],
      },
    });
    if (!user) {
      return sendRes({
        res: res,
        code: 401,
        data: null,
        success: false,
        message: "User not found.",
      });
    }
    // UNCOMMENT this when access types are supported
    // if(user.type !== "ADMIN") {
    //   return sendRes({
    //     res: res,
    //     code: 401,
    //     data: null,
    //     success: false,
    //     message: "You dont have admin access rights!",
    //   });
    // }
    req.user = user;
    next();
  } catch (error) {
    return sendRes({
      res: res,
      code: 401,
      data: null,
      success: false,
      message: error,
    });
  }
};
