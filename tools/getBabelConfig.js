const path = require('path');

const getBabelConfig = (projectDir) => {
  // todo: is this needed?
  const isJest = process.env.NODE_ENV === 'test';
  // const isDev = process.env.NODE_ENV === 'development';

  const presets = [
    [
      '@babel/preset-env',
      {
        // normally don't transpile import statements so webpack can do tree shaking
        // for jest however (NODE_ENV=test) need to transpile import statements
        modules: isJest ? 'auto' : false,
        // pull in bits you need from babel polyfill eg regeneratorRuntime etc
        useBuiltIns: 'usage',
        targets: { browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead' }
      },
    ],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];


  const plugins = [];

  return {
    presets,
    plugins,
    // babelrcRoots: [`${__dirname}/packages/*`]
  };
};

const env = process.env;
const isTest = env.NODE_ENV === 'test';
const isDev = env.NODE_ENV === 'development';

const babelPresetEnvOptions = {
  // normally don't transpile import statements so webpack can do tree shaking
  // for jest however (NODE_ENV=test) need to transpile import statements
  modules: isTest ? 'auto' : false,
  // pull in bits you need from babel polyfill eg regeneratorRuntime etc
  useBuiltIns: 'usage',
  // todo: consider switching to external browserslist config
  targets: { browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead' }
};

function getBabelConfig2({ babelTarget = 'library' } = {}) {
  const isWeb = babelTarget === 'web';
  const isLib = babelTarget === 'library';
  const isNative = babelTarget === 'native';

  const presets = [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ];
  const plugins = [
    ['styled-components']
  ];
  let sourceMaps = false;

  if (isWeb) {
    presets.push(["next/babel", { "preset-env": babelPresetEnvOptions }]);
    presets.push(['@babel/preset-react']);
  } else if (isLib) {
    presets.push(['@babel/preset-env', babelPresetEnvOptions]);
    presets.push(['@babel/preset-react']);
  } else if (isNative) {
    presets.push(['module:metro-react-native-babel-preset']);
    // TODO: is decorators plugin needed?
    plugins.push(['@babel/plugin-proposal-decorators', { legacy: true }]);
    sourceMaps = 'inline';
  }

  return {
    presets,
    plugins,
    // sourceMaps
    // babelrcRoots: [`${__dirname}/packages/*`]
  };
}

module.exports = {
  getBabelConfig2,
};
