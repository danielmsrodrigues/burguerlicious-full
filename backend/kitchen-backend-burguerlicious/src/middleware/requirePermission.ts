import { Request, Response, NextFunction } from "express";

export const requirePermission = (permission_id: string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userPermission = request.user.permission_id;

    if (userPermission === permission_id) {
      return next();
    } else {
      response.status(403).json({ error: "Insufficient permission." });
    }
  };
};
