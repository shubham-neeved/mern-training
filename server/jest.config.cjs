const { createDefaultEsmPreset } = require("ts-jest");

const preset = createDefaultEsmPreset();

module.exports = {
  ...preset,

  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  testMatch: ["**/tests/**/*.test.ts"],

  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  testTimeout: 60000,
};