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

const { getBabelConfig2 } = require('../../tools/getBabelConfig');

module.exports = function(api) {
  api.cache(true);
  return getBabelConfig2({ babelTarget: 'native' });
};

