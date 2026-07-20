import { UserModel} from "../models/user.model.js";
import { CreateUser, updateUser } from "../types/types.js";

export const UserRepository = {
  findALL: async () => {
    return UserModel.find();
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
