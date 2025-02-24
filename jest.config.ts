import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use "jsdom" se for testar código frontend
  testMatch: ['**/__tests__/**/*.test.ts'], // Padrão para testes
  clearMocks: true,
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};

export default config;
