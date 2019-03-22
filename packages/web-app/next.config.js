// const withTM = require('next-transpile-modules')
//
// // Tell webpack to compile the "bar" package
// // https://www.npmjs.com/package/next-transpile-modules
// module.exports = withTM({
//   transpileModules: ['bar']
// })

const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withTranspileModules = require('next-transpile-modules');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const StatsPlugin = require('stats-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports =
  withBundleAnalyzer(
    withTypescript(
      withTranspileModules({
        transpileModules: [
          '@chatapp',
          // TODO: this is a hack to get around clashes between next-transpile-modules and babel-plugin-module-resolver
          //       https://github.com/martpie/next-transpile-modules/issues/21
          // '\.\./.+/src/.+\.tsx?'
        ],
        analyzeServer: process.env.NODE_ENV === 'production',
        analyzeBrowser: process.env.NODE_ENV === 'production',
        // analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        // analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: '../../reports/webpack/server/analysis.html'
          },
          browser: {
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: '../reports/webpack/client/analysis.html'
          }
        },
        webpack(config, { dev, isServer }) {
          // Do not run type checking twice:
          // if (isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
          if (!dev) {
            config.plugins.push(
              isServer ? new StatsPlugin('../../reports/webpack/server/stats.json') : new StatsPlugin('../reports/webpack/client/stats.json'),
            );
          }

          config.resolve.extensions = [
            '.ts',
            '.tsx',
            '.wasm',
            '.mjs',
            '.js',
            '.jsx',
            '.json',
            // '*'
          ];

          if (isServer) {
            config.plugins.push(
              new ForkTsCheckerWebpackPlugin({ measureCompilationTime: true }),
            );
          }

          // console.log(config.resolve.plugins);
          // config.resolve.plugins = [
          //   ...(config.resolve.plugins || []),
          //   new TsconfigPathsPlugin({ /*configFile: "./path/to/tsconfig.base.json" */ })
          // ];

          // // console.log(config.resolve.extensions);
          // config.resolve.alias = {
          //   ...config.resolve.alias,
          //   // Will make webpack look for these modules in parent directories
          //   '@chatapp/foo': path.resolve(__dirname, '../foo/src'),
          //   '@chatapp/bar': path.resolve(__dirname, '../bar/src'),
          //   '@chatapp/biz': path.resolve(__dirname, '../biz/src'),
          //   // '@chatapp/bar': require.resolve('@chatapp/bar'),
          //   // '@chatapp/biz': require.resolve('@chatapp/biz'),
          // };

          return config
        },
      }),
    ),
  );
