const path = require('path');

const getBabelConfig = (projectDir) => {
  const isJest = process.env.NODE_ENV === 'test';

  const presets = [
    [
      '@babel/env',
      {
        // normally don't transpile import statements so webpack can do tree shaking
        // for jest however (NODE_ENV=test) need to transpile import statements
        modules: isJest ? 'auto' : false,
        // pull in bits you need from babel polyfill eg regeneratorRuntime etc
        // useBuiltIns: 'usage',
        // targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
      },
    ],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];


  const plugins = [];

  return {
    presets,
    plugins,
  };
};

module.exports = {
  getBabelConfig,
};
