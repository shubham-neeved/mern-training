import { UserRepository } from "../repositories/users.repository.js";
import { CreateUser, updateUser } from "../types/types.js";
import { HttpError } from "../utils/httperror.js";
import { GetUserQuery } from "../validators/user.validator.js";
export const UserService = {
  getUsers: async (query:GetUserQuery) => {
    return UserRepository.findALL(query);
  },
  getUserById: async (id: string) => {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw HttpError.notFound("User not found at this id");
    }
    return user;
  },

  createUser: async (data: CreateUser) => {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw HttpError.conflictError("User with this email already exists");
    }
    return UserRepository.CreateUser(data);
  },

  UpdateUser: async (id: string, data: updateUser) => {
    const Updateduser = await UserRepository.update(id, data);
    if (!Updateduser) {
      throw HttpError.notFound("User not found at this id");
    }
    return Updateduser;
  },

  deleteUser: async (id: string) => {
    const user = await UserRepository.delete(id);
    if (!user) {
      throw HttpError.notFound("User not found at this id");
    }
    return user;
  },
};
