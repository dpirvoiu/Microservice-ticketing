import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // @ts-ignore
  if (!req.currentUser) {
    // if there is no current user
    throw new NotAuthorizedError();
  }

  next();
};
