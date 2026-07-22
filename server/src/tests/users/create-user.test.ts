import request from "supertest";
import app from "../../app.js";

describe("post /users",()=>{
    it("should create a new user", async()=>{
        const response=await request(app)
        .post("/users")
        .send({
            firstName:"shubham",
            lastName:"thakkar",
            email:"shubham@gmail.com",
            age:22,
            gender:"male",
            phone:"6356965787",
            status:"active",
            city:"Ahmedabad",
        });
        expect(response.status).toBe(201);
        expect(response.body.firstName).toBe("shubham");
        expect(response.body.email).toBe("shubham@gmail.com");
    });
    it("should return 400 for invalid email", async()=>{
         const response=await request(app)
        .post("/users")
        .send({
            firstName:"shubham",
            lastName:"thakkar",
            email:"shubham.mail",
            age:22,
            gender:"male",
            phone:"6356965787",
            status:"active",
            city:"Ahmedabad",
    });
     expect(response.status).toBe(400);
})
 it("should return 400 for under age ", async()=>{
         const response=await request(app)
        .post("/users")
        .send({
            firstName:"shubham",
            lastName:"thakkar",
            email:"shubham@gmail.com",
            age:12,
            gender:"male",
            phone:"6356965787",
            status:"active",
            city:"Ahmedabad",
    });
     expect(response.status).toBe(400);
})
it("should return 400 when firstName is missing", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      lastName: "Thakkar",
      email: "shubham@gmail.com",
      age: 22,
      gender: "male",
      phone: "6356965787",
      status: "active",
      city: "Ahmedabad",
    });

  expect(response.status).toBe(400);
});
it("should return 400 for invalid age", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      firstName: "Shubham",
      lastName: "Thakkar",
      email: "shubham@gmail.com",
      age: -5,
      gender: "male",
      phone: "6356965787",
      status: "active",
      city: "Ahmedabad",
    });

  expect(response.status).toBe(400);
});
it("should return 400 for invalid phone", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      firstName: "Shubham",
      lastName: "Thakkar",
      email: "shubham@gmail.com",
      age: 22,
      gender: "male",
      phone: "123",
      status: "active",
      city: "Ahmedabad",
    });

  expect(response.status).toBe(400);
});
it("should return 400 for invalid gender", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      firstName: "Shubham",
      lastName: "Thakkar",
      email: "shubham@gmail.com",
      age: 22,
      gender: "unknown",
      phone: "6356965787",
      status: "active",
      city: "Ahmedabad",
    });

  expect(response.status).toBe(400);
});
it("should return 400 for invalid status", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      firstName: "Shubham",
      lastName: "Thakkar",
      email: "shubham@gmail.com",
      age: 22,
      gender: "male",
      phone: "6356965787",
      status: "unblocked",
      city: "Ahmedabad",
    });

  expect(response.status).toBe(400);
});
it("should return 409 when email already exists", async () => {
  const user = {
    firstName: "Shubham",
    lastName: "Thakkar",
    email: "duplicate@gmail.com",
    age: 22,
    gender: "male",
    phone: "6356965787",
    status: "active",
    city: "Ahmedabad",
  };

  await request(app).post("/users").send(user);

  const response = await request(app)
    .post("/users")
    .send(user);

  expect(response.status).toBe(409);
});

});