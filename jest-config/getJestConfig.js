function getJestConfig({ projectDir }) {
  const pkg = require(`${projectDir}/package`);
  return {
    displayName: pkg.name,
    testMatch: ['<rootDir>/src/**/?(*.)spec.[jt]s?(x)'],
    moduleNameMapper: {
      '@chatapp/(.+)': '<rootDir>/../$1/src',
    },
  }
}

module.exports = {
  getJestConfig
};
