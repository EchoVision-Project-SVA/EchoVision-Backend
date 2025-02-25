const request = require("supertest");
const app = require("../app");

describe("Subscriptions", () => {
  let token;
  let userId;
  let subscriptionId;

  beforeAll(async () => {
    // Login as admin to get token
    const res = await request(app).post("/auth/login").send({
      email: "admin@example.com",
      password: "password123",
    });
    token = res.body.token;

    // Create a user for subscription testing
    const userRes = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

    userId = userRes.body.id;
  });

  it("should create a new subscription", async () => {
    const res = await request(app)
      .post("/subscriptions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: userId,
        subscription_type: "monthly",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.subscription_type).toBe("monthly");
    expect(res.body).toHaveProperty("expiration_date");
    subscriptionId = res.body.id;
  });

  it("should not allow invalid subscription types", async () => {
    const res = await request(app)
      .post("/subscriptions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: userId,
        subscription_type: "weekly",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      "Invalid subscription type. Choose 'monthly' or 'yearly'."
    );
  });

  it("should get all subscriptions", async () => {
    const res = await request(app)
      .get("/subscriptions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a subscription", async () => {
    const res = await request(app)
      .put(`/subscriptions/${subscriptionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        subscription_type: "yearly",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.subscription_type).toBe("yearly");
    expect(res.body).toHaveProperty("expiration_date");
  });

  it("should delete a subscription", async () => {
    const res = await request(app)
      .delete(`/subscriptions/${subscriptionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Subscription deleted successfully");
  });
});
