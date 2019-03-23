const { getBabelConfig2 } = require('../../tools/getBabelConfig');

module.exports = function(api) {
  api.cache(true);
  return getBabelConfig2({ babelTarget: 'native' });
};

