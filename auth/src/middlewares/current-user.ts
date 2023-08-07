import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      // add a new property to the Request interface
      currentUser?: UserPayload; // currentUser is optional
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next(); // go to next middleware if the user is not logged in
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    // @ts-ignore
    req.currentUser = payload;
  } catch (err) {}

  next(); // weather or not the code above throws an error, go to next middleware
};
