import { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/modules/**/infra/repositories/**',
    '!src/modules/**/domain/repositories/**',
    '!src/core/logic/*.ts',
    '!src/infra/**/*.ts',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['text-summary', 'lcov'],
  coverageProvider: 'v8',
};

export default config;