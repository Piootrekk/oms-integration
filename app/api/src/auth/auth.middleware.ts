import { NextFunction, Response, Request } from "express";
import { getApiKey } from "./../config/env";
import { CustomError, handeError } from "./../utils/error-handler";

type Auth = {
  key?: string;
};

const extractUserKeyFromBearer = (authHeader?: string): string | undefined => {
  if (!authHeader) return undefined;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return undefined;
  }
  return parts[1];
};

const isKey = (key?: string) => {
  if (!key)
    throw new CustomError(
      "Please set api key in param or token Bearer header.",
      401,
    );
  return key;
};

const isCorrectKey = (apiKey: string, userKey: string) => {
  if (userKey !== apiKey) throw new CustomError("Invalid key provided.", 401);
};

const authMiddleware = (
  request: Request<unknown, unknown, unknown, Auth>,
  response: Response,
  next: NextFunction,
) => {
  const apiKey = getApiKey();
  const authHeader = request.headers["authorization"];
  const authKey = extractUserKeyFromBearer(authHeader);
  const queryKey = request.query.key;
  const userKey = queryKey || authKey;
  try {
    const existingKey = isKey(userKey);
    isCorrectKey(apiKey, existingKey);
    next();
  } catch (error) {
    const err = handeError(error);
    response.status(err.status).send(err.message);
  }
};

export { authMiddleware };
