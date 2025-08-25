import { createApp } from "../src/app";
import { closeDb, connectDb } from "../src/config/db";
import request from "supertest";

const app = createApp();
const mockApiKey = "test-api-key";

beforeAll(async () => {
  process.env.API_KEY = mockApiKey;
  await connectDb();
});

afterAll(async () => {
  await closeDb();
});

describe("GET /api/v1/order/:orderId", () => {
  it("should return 200 status with csv file, with correct :orderId using key query", async () => {
    const orderId = "aaaa@aa.aa-1";
    const res = await request(app).get(`/api/v1/order/${orderId}`).query({
      key: mockApiKey,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
    expect(res.text).toContain(orderId);
  });
  it("should return 200 status with csv file, with correct :orderId using bearer token authentication", async () => {
    const orderId = "aaaa@aa.aa-1";
    const res = await request(app)
      .get(`/api/v1/order/${orderId}`)
      .set("Authorization", `Bearer ${mockApiKey}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
    expect(res.text).toContain(orderId);
  });
  it("should return 404 status if :orderId not found id Db", async () => {
    const orderId = "orderId not exist";
    const res = await request(app).get(`/api/v1/order/${orderId}`).query({
      key: mockApiKey,
    });
    expect(res.status).toBe(404);
    expect(res.text).toBe(`Order with ID ${orderId} was not found.`);
  });
  it("should return 401 status if secret not provied", async () => {
    const orderId = "orderId not exist";
    const res = await request(app).get(`/api/v1/order/${orderId}`);
    expect(res.status).toBe(401);
    expect(res.text).toBe(
      `Please set api key in param or token Bearer header.`,
    );
  });
  it("should return 401 status if secret is invalid via key query", async () => {
    const invalidCredential = "invalid-key";
    const orderId = "orderId not exist";
    const res = await request(app).get(`/api/v1/order/${orderId}`).query({
      key: invalidCredential,
    });
    expect(res.status).toBe(401);
    expect(res.text).toBe(`Invalid key provided.`);
  });
  it("should return 401 status if secret is invalid via auth header", async () => {
    const invalidCredential = "invalid-key";
    const orderId = "orderId not exist";
    const res = await request(app)
      .get(`/api/v1/order/${orderId}`)
      .set("Authorization", `Bearer ${invalidCredential}`);
    expect(res.status).toBe(401);
    expect(res.text).toBe(`Invalid key provided.`);
  });
});
