import type { Config } from "jest";

const config: Config = {
  displayName: "api-unit",
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/?(*.)+(test|spec).[tj]s?(x)",
    "!**/?(*.)+(int.test|int.spec).[tj]s?(x)",
  ],
};

export default config;
