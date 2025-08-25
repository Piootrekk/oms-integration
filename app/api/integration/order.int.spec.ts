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
  it("should return 200 status with csv file, using key query", async () => {
    const orderId = "aaaa@aa.aa-1";
    const res = await request(app).get(`/api/v1/order/${orderId}`).query({
      key: mockApiKey,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.text.split("\n").length).toBeGreaterThan(1);
    expect(res.text).toContain(orderId);
  });
});
