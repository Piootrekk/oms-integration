import type { Config } from "jest";
import baseConfig from "./jest.config";

const config: Config = {
  ...baseConfig,
  projects: baseConfig.projects?.map((project) => {
    if (typeof project === "object" && project !== null) {
      return {
        ...project,
        testMatch: [
          "**/?(*.)+(test|spec).[tj]s?(x)",
          "!**/?(*.)+(int.test|int.spec).[tj]s?(x)",
        ],
      };
    }
    return project;
  }),
};

export default config;
