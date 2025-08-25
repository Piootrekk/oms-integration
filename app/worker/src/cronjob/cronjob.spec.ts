const validateCronExpression = jest.fn();
const mockNextDate = jest.fn();
const mockCronJob = {
  nextDate: mockNextDate,
} as unknown as CronJob;

import {
  getDatesRage,
  getIntervalTick,
  getStringifyDate,
  validateCronJobString,
} from "./cronjob";
import { CronJob } from "cron";

describe("validateCronJobString", () => {
  it("should return cronjob string when validation passes", () => {
    validateCronExpression.mockReturnValue({ valid: true });
    const result = validateCronJobString("0 0 * * *");
    expect(result).toBe("0 0 * * *");
  });

  it("should throw error when validation fails", () => {
    validateCronExpression.mockReturnValue({
      valid: false,
      error: { message: "Invalid format" },
    });
    expect(() => validateCronJobString("invalid")).toThrow(Error);
  });
});

describe("getIntervalTick", () => {
  it("should return difference in milliseconds", () => {
    const mockDiff = { as: jest.fn().mockReturnValue(60000) };
    const mockNextDateResult = { diffNow: jest.fn().mockReturnValue(mockDiff) };
    mockNextDate.mockReturnValue(mockNextDateResult);
    const result = getIntervalTick(mockCronJob);
    expect(result).toBe(60000);
  });
});

describe("getDatesRage", () => {
  it("should return current date and date before", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000000);
    const mockDiff = { as: jest.fn().mockReturnValue(60000) };
    const mockNextDateResult = { diffNow: jest.fn().mockReturnValue(mockDiff) };
    mockNextDate.mockReturnValue(mockNextDateResult);
    const result = getDatesRage(mockCronJob);
    expect(result.currentDate).toBeInstanceOf(Date);
    expect(result.dateBefore).toBeInstanceOf(Date);
  });

  it("should calculate date before correctly", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000000);
    const mockDiff = { as: jest.fn().mockReturnValue(60000) };
    const mockNextDateResult = { diffNow: jest.fn().mockReturnValue(mockDiff) };
    mockNextDate.mockReturnValue(mockNextDateResult);
    const result = getDatesRage(mockCronJob);
    expect(result.dateBefore.getTime()).toBe(940000);
  });
});

describe("getStringifyDate", () => {
  it("should return stringified dates", () => {
    const currentDate = new Date("2023-01-01T12:00:00");
    const dateBefore = new Date("2023-01-01T11:00:00");

    const result = getStringifyDate(currentDate, dateBefore);
    expect(typeof result.currentDate).toBe("string");
    expect(typeof result.dateBefore).toBe("string");
  });
});
