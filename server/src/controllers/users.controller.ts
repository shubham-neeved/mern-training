import { NextFunction, Request, Response } from "express";

import { CreateUser, ParamsUser, updateUser } from "../types/types.js";
import { HttpError } from "../utils/httperror.js";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/users.service.js";
import { validate } from "../middleware/validate.middleware.js";
import { CreateUserSchema,updateUserSchema,userParamsSchema,getUsersQuerySchema, GetUserQuery } from "../validators/user.validator.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getUsers(req.query as any);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUserbyId = async (
  req: Request<ParamsUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request<{}, {}, CreateUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const UpdateUser = async (
  req: Request<ParamsUser, {}, updateUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserService.UpdateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<ParamsUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
