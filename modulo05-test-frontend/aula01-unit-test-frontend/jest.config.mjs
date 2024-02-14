/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
};

export default config;
