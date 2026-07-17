import { Request, Response } from "express";
import { users } from "../data.js";
import { CreateUser, ParamsUser, updateUser } from "../types/types.js";
import { HttpError } from "../utils/httperror.js";

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};
export const getUserbyId = (req: Request<ParamsUser>, res: Response) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw HttpError.notFound("User not found at this id");
  }
  res.status(200).json(user);
};

export const createUser = (req: Request<{}, {}, CreateUser>, res: Response) => {
  const { name, email } = req.body;
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};
export const UpdateUser = (
  req: Request<ParamsUser, {}, updateUser>,
  res: Response,
) => {
  const id = req.params.id;
  const { name, email } = req.body;
  console.log("Param id:", id);
  const user = users.find((user) => {
    return user.id === id;
  });
  console.log("Users:", users);
  if (!user) {
   throw  HttpError.notFound( "User not found at this id");
  }
  if (name !== undefined) {
    user.name = name;
  }
  if (email !== undefined) {
    user.email = email;
  }
  res.status(200).json(user);
};
export const deleteUser = (req: Request<ParamsUser>, res: Response) => {
  const id = req.params.id;
  const userid = users.findIndex((user) => user.id === id);
  if (userid === -1) {
    return res.status(404).json({ message: "user not found at this id" });
  }
  users.splice(userid, 1);
  res.status(200).json({ message: "user deleted successfully" });
};
