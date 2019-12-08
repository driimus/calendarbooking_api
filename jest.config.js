module.exports = {
  displayName: 'test',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'modules/*/{!(schema),}.js',
    '!modules/User/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/assets/',
    '/__tests__/fixtures/',
  ],
};
