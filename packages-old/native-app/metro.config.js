const metro = require('metro');
const path = require('path');

module.exports = {
  resolver: {
    blacklistRE: metro.createBlacklist([
      /foo\/node_modules\/.*/
    ]),
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
    }),
    sourceExts: [
      "ts",
      "tsx",
      "js",
      "json",
      "css",
      "scss"
    ]
  },
  transformer: {
    babelTransformerPath: "react-native-ueno-css-modules/transformer"
  },
  watchFolders: [
    path.join(process.cwd(), '../foo'),
  ],
}
