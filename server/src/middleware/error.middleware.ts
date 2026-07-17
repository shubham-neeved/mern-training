import { ErrorRequestHandler } from "express";
import { HttpError } from "../utils/httperror.js";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    sucess: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
