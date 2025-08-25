"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    projects: [
        {
            displayName: "api",
            rootDir: "./app/api",
            preset: "ts-jest",
            testEnvironment: "node",
            testMatch: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
            transform: {
                "^.+\\.ts$": "ts-jest",
            },
            moduleNameMapper: {
                "^@shared/(.*)$": "<rootDir>/../shared/src/$1",
            },
        },
        {
            displayName: "worker",
            rootDir: "./app/worker",
            preset: "ts-jest",
            testEnvironment: "node",
            testMatch: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
            transform: {
                "^.+\\.ts$": "ts-jest",
            },
            moduleNameMapper: {
                "^@shared/(.*)$": "<rootDir>/../shared/src/$1",
            },
        },
        {
            displayName: "mongo-lib",
            rootDir: "./app/shared/src",
            preset: "ts-jest",
            testEnvironment: "node",
            testMatch: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
            transform: {
                "^.+\\.ts$": "ts-jest",
            },
        },
    ],
    collectCoverage: false,
    verbose: true,
};
exports.default = config;
