import { RequestHandler } from "express";
import { verifyToken } from "../libs/token";
import { JwtPayload } from "jsonwebtoken";

export const verifyTokenMiddleware: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  try {
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    console.log(token);
    verifyToken(token, (error, decoded) => {
      console.log(decoded, error);
      if (error) {
        res.status(403);
        throw new Error("Forbidden");
      }
      req.email = (decoded as JwtPayload)?.email;
      next();
    });
  } catch (error) {
    throw error;
  }
};
