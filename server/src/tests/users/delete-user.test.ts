import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import { createUser } from "../helper/createUser.js";

describe("DELETE /users/:id", () => {
  it("should delete user", async () => {
    const createResponse = await request(app)
      .post("/users")
      .send(createUser());

    const response = await request(app).delete(
      `/users/${createResponse.body._id}`
    );

    expect(response.status).toBe(200);
  });

  it("should remove user from database", async () => {
    const createResponse = await request(app)
      .post("/users")
      .send(createUser());

    await request(app).delete(`/users/${createResponse.body._id}`);

    const response = await request(app).get(
      `/users/${createResponse.body._id}`
    );

    expect(response.status).toBe(404);
  });

  it("should return 404 if user does not exist", async () => {
    const id = new mongoose.Types.ObjectId();

    const response = await request(app).delete(`/users/${id}`);

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid ObjectId", async () => {
    const response = await request(app).delete("/users/123");

    expect(response.status).toBe(400);
  });
});