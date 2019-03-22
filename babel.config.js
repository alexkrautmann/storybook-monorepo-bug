const { getBabelConfig2 } = require('./tools/getBabelConfig');

// This is only needed here for jest right now since it does not change babel CWD per each project
module.exports = function(api) {
  api.cache(true);
  return getBabelConfig2();
};
