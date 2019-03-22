const pkg = require('./package');
// const babelConfig = require('./babel.config');
// const { loadPartialConfig } = require("@babel/core");
// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { compilerOptions } = require('./tsconfig');

module.exports = {
    displayName: pkg.name,
    testMatch: ['<rootDir>/src/**/?(*.)spec.[jt]s?(x)'],
    rootDir: './'
};

