const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'src.*\\.test\\.(ts|js|tsx|jsx)$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'cjs'],
  extensionsToTreatAsEsm: ['.ts'],
  automock: false,
  resetMocks: false,
  verbose: true,
};

module.exports = config;
