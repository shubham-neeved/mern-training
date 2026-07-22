import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import { createUser } from "../helper/createUser.js";

describe("PUT /users/:id", () => {
  it("should update user", async () => {
    const createResponse = await request(app)
      .post("/users")
      .send(createUser());

    const response = await request(app)
      .put(`/users/${createResponse.body._id}`)
      .send({
        firstName: "Rahul",
        city: "Surat",
      });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("Rahul");
    expect(response.body.city).toBe("Surat");
  });

  it("should return 404 if user does not exist", async () => {
    const id = new mongoose.Types.ObjectId();

    const response = await request(app)
      .put(`/users/${id}`)
      .send({
        firstName: "Rahul",
      });

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid ObjectId", async () => {
    const response = await request(app)
      .put("/users/123")
      .send({
        firstName: "Rahul",
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid data", async () => {
    const createResponse = await request(app)
      .post("/users")
      .send(createUser());

    const response = await request(app)
      .put(`/users/${createResponse.body._id}`)
      .send({
        age: -10,
      });

    expect(response.status).toBe(400);
  });
});