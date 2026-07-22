import request from "supertest";
import app from "../../app.js";
describe("GET /users", () => {
  it("should return all users", async () => {
    await request(app).post("/users").send({
      firstName: "Shubham",
      lastName: "Thakkar",
      email: "shubham@test.com",
      age: 22,
      gender: "male",
      phone: "9876543210",
      status: "active",
      city: "Ahmedabad",
    });
    await request(app).post("/users").send({
      firstName: "Rahul",
      lastName: "Patel",
      email: "rahul@test.com",
      age: 25,
      gender: "male",
      phone: "9876543211",
      status: "inactive",
      city: "Surat",
    });
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should return an empty array when no users exist", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  it("should pagignate users", async () => {
    for (let i = 1; i <= 5; i++) {
      await request(app)
        .post("/users")
        .send({
          firstName: `User${i}`,
          lastName: "Test",
          email: `user${i}@test.com`,
          age: 20 + i,
          gender: "male",
          phone: `98765432${10 + i}`,
          status: "active",
          city: "Ahmedabad",
        });
    }
    const response = await request(app).get("/users?page=1&limit=2");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
