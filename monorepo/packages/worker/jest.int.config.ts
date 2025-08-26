import type { Config } from "jest";

const config: Config = {
  displayName: "worker-int",
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(int.test|int.spec).[tj]s?(x)"],
};

export default config;
