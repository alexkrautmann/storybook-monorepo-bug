const pkg = require('./package');

module.exports = {
    displayName: pkg.name,
    testMatch: ['<rootDir>/src/**/?(*.)spec.[jt]s?(x)'],
    rootDir: './',
};
