import { FilterQuery } from "mongoose";
import { User, UserModel } from "../models/user.model.js";
import { CreateUser, updateUser } from "../types/types.js";
import {
  GetUserQuery,
  getUsersQuerySchema,
} from "../validators/user.validator.js";

export const UserRepository = {
  findALL: async ({
    page,
    limit,
    status,
    city,
    sortBy,
    order,
  }: GetUserQuery) => {
    const filter: FilterQuery<User> = {};
    if (status) {
      filter.status = status;
    }
    if (city) {
      filter.city = city;
    }
   const query = UserModel.find(filter);

if (sortBy) {
  query.sort({
    [sortBy]: order === "asc" ? 1 : -1,
  });
}

query.skip((page - 1) * limit).limit(limit);

return query;
  },
  findById: async (id: string) => {
    return UserModel.findById(id);
  },
  findByEmail: async (email: string) => {
    return UserModel.findOne({ email });
  },
  CreateUser: async (data: CreateUser) => {
    return UserModel.create(data);
  },
  update: async (id: string, data: updateUser) => {
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },
  delete: async (id: string) => {
    return UserModel.findByIdAndDelete(id);
  },
};
