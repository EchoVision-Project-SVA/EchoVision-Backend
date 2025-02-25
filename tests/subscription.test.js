const request = require("supertest");
const app = require("../app");

describe("Subscriptions", () => {
  let token;

  beforeAll(async () => {
    // Login as admin to get token
    const res = await request(app).post("/auth/login").send({
      email: "admin@example.com",
      password: "password123",
    });
    token = res.body.token;
  });

  it("should get all subscriptions", async () => {
    const res = await request(app)
      .get("/subscriptions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
