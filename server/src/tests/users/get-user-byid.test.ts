import request from "supertest";
import app from "../../app.js";
import { createUser } from "../helper/createUser.js";
import mongoose from "mongoose";
describe("GET /users/:id", () => {
  it("should get user by id", async () => {
  const createResponse = await request (app)
    .post("/users")
    .send(createUser());

  const response = await request(app)
    .get(`/users/${createResponse.body._id}`);

  expect(response.status).toBe(200);
  expect(response.body.email).toBe("shubham@test.com");
});
it("should return 404 if user does not exist", async () => {
  const id = new mongoose.Types.ObjectId();

  const response = await request(app).get(`/users/${id}`);

  expect(response.status).toBe(404);
});
it("should return 400 for invalid ObjectId", async () => {
  const response = await request(app).get("/users/123");

  expect(response.status).toBe(400);
});
});