/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,

  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': `${__dirname}/src/assets/__mock__/fileMock.tsx`,
    '.(css|sass|scss)$': `${__dirname}/src/assets/__mock__/fileMock.tsx`,
  },

  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
