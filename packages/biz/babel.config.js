const {getBabelConfig} = require('../../getBabelConfig');

module.exports = function(api) {
  api.cache(true);

  const config = getBabelConfig(__dirname);

  config.presets.push('@babel/preset-react');
  //
  // config.plugins.push('styled-components');

  return config;
};
