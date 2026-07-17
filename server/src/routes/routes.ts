import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserbyId,
  getUsers,
  UpdateUser,
} from "../controllers/users.controller.js";
const router = Router();
router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", deleteUser);
export default router;
