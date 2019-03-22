const {getBabelConfig} = require('../../getBabelConfig');

module.exports = function(api) {
  api.cache(true);

  const config = getBabelConfig(__dirname);

  config.presets.push('@babel/preset-react');
  config.presets.push('@babel/preset-env');
  //
  // config.plugins.push('styled-components');

  return config;
};
