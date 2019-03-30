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
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withProgressBar = require('next-progressbar');
const withSize = require('next-size')
const StatsPlugin = require('stats-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports =
  withBundleAnalyzer(
    withSize(
      withProgressBar(
        withTypescript(
          withTranspileModules({
            transpileModules: ['@chatapp'],
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
            progressBar: {
              profile: process.env.NODE_ENV === 'production'
            },
            webpack(config, { dev, isServer }) {

              // Do not run type checking twice:
              if (isServer) {
                config.plugins.push(
                  new ForkTsCheckerWebpackPlugin({ measureCompilationTime: true }),
                );
              }

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

              return config
            },
          }),
        ),
      ),
    ),
  );
