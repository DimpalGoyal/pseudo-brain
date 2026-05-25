import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "./config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, secret);
  if (decoded) {
    //@ts-ignore
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({ message: "user is not logged in" });
  }
};
