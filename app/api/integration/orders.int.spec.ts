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

describe("GET /api/v1/orders/", () => {
  it("should return 200 with csv file, without params, all ordes using key", async () => {
    const res = await request(app).get(`/api/v1/orders`).query({
      key: mockApiKey,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
  });
  it("should return 200 with csv file, with params minWorh, maxWorth, ordes using key", async () => {
    const res = await request(app).get(`/api/v1/orders`).query({
      key: mockApiKey,
      minWorth: "33.33",
      maxWorth: "50.55",
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
  });
  it("should return 200 with only minWorth", async () => {
    const res = await request(app).get("/api/v1/orders").query({
      key: mockApiKey,
      minWorth: "10.00",
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
  });
  it("should return 200 with only maxWorth", async () => {
    const res = await request(app).get("/api/v1/orders").query({
      key: mockApiKey,
      maxWorth: "100.00",
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
  });
  it("should return 401 with params, without secret provided", async () => {
    const res = await request(app).get("/api/v1/orders").query({
      maxWorth: "100.00",
      minWorth: "22.22",
    });
    expect(res.status).toBe(401);
  });
  it("should return 400 with params, if invalid data", async () => {
    const res = await request(app)
      .get("/api/v1/orders")
      .query({
        maxWorth: "aaaa",
        minWorth: "bbb",
      })
      .set("Authorization", `Bearer ${mockApiKey}`);
    expect(res.status).toBe(400);
    expect(res.text).toBe(`Invalid number NaN`);
  });
  it("should return 400 with params, if minWorth > maxWorth", async () => {
    const res = await request(app)
      .get("/api/v1/orders")
      .query({
        maxWorth: "12",
        minWorth: "50.2",
      })
      .set("Authorization", `Bearer ${mockApiKey}`);
    expect(res.status).toBe(400);
    expect(res.text).toBe(`MinWorth is higher then maxWorth`);
  });
});
