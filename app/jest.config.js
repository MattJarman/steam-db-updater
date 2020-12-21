module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^@Test/(.*)$': '<rootDir>/test/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts'],
  setupFiles: ['dotenv/config']
}
