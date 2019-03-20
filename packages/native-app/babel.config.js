// module.exports = function(api) {
//   api.cache(true);
//
//   const presets = [
//     "module:metro-react-native-babel-preset"
//   ];
//
//   const plugins = [
//     "styled-components",
//     // TODO: do we even use decorators?
//     ["@babel/plugin-proposal-decorators", { legacy: true }]
//   ];
//
//   return {
//     presets,
//     plugins,
//     sourceMaps: 'inline'
//   };
// };

const {getBabelConfig} = require('../../getBabelConfig');

module.exports = function(api) {
  api.cache(true);

  const config = getBabelConfig(__dirname);

  // config.presets.push('module:metro-react-native-babel-preset');
  config.presets = [
    'module:metro-react-native-babel-preset',
    ...config.presets,
  ];

  config.plugins.push('styled-components');
  // TODO: do we even use decorators?
  config.plugins.push(['@babel/plugin-proposal-decorators', { legacy: true }]);

  // config.sourcemaps = 'inline';

  return config;
};


// {
//   "presets": ["module:metro-react-native-babel-preset"],
//   "sourceMaps": "inline",
//   "plugins": [
//   [
//     "@babel/plugin-proposal-decorators",
//     {
//       "legacy": true
//     }
//   ]
// ]
// }
