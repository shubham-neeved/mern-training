import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserbyId,
  getUsers,
  UpdateUser,
} from "../controllers/users.controller.js";
import * as userController from "../controllers/users.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  CreateUserSchema,
  updateUserSchema,
  userParamsSchema,
  getUsersQuerySchema,
} from "../validators/user.validator.js";
const router = Router();
router.get("/users", validate(getUsersQuerySchema), userController.getUsers);
router.get(
  "/users/:id",
  validate(userParamsSchema),
  userController.getUserbyId,
);
router.post("/users", validate(CreateUserSchema), userController.createUser);
router.put(
  "/users/:id",
  validate(userParamsSchema),
  validate(updateUserSchema),
  userController.UpdateUser,
);
router.delete(
  "/users/:id",
  validate(userParamsSchema),
  userController.deleteUser,
);
export default router;
