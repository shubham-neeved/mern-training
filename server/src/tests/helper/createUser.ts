
export const createUser = (overrides = {}) => ({
  firstName: "Shubham",
  lastName: "Thakkar",
  email: "shubham@test.com",
  age: 22,
  gender: "male",
  phone: "9876543210",
  status: "active",
  city: "Ahmedabad",
  ...overrides,
});
