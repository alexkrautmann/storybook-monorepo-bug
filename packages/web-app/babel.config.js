const path = require('path');

const getResolverAlias = projectDir => {
  const tsConfigFile = path.join(projectDir, 'tsconfig.json');
  const tsConfig = require(tsConfigFile);

  const tsConfigPaths =
    (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) || {};

  // remove the "/*" at end of tsConfig paths key and values array
  const pathAlias = Object.keys(tsConfigPaths)
    .map(tsKey => {
      const pathArray = tsConfigPaths[tsKey];
      const key = '^' + tsKey.replace('/*', '/(.+)');
      // make sure path starts with "./"
      // todo: instead of indexing from array here, should we create multiple if they exist
      const paths = pathArray.map(p => `./${p.replace('*/', '\\1/')}`)[0];
      return { key, paths };
    })
    .reduce((obj, cur) => {
      obj[cur.key] = cur.paths; // eslint-disable-line no-param-reassign
      return obj;
    }, {});

  return pathAlias;
};

const {resolvePath} = require('babel-plugin-module-resolver');

const fixResolvePath = (projectDir) => (
  sourcePath,
  currentFile,
  opts,
) => {
  const ret = resolvePath(sourcePath, currentFile, opts);
  if (!sourcePath.startsWith('src')) return ret; // ignore non "src" dirs

  // common root folder of all apps (ie "c:\git\Monorepo")
  const basePath = path.join(projectDir, '../');

  // currentFile is of form "c:\git\Monorepo\components\src\comps\Foo\Foo.tsx"
  // extract which project this file is in, eg "components"
  const currentFileEndPath = currentFile.substring(basePath.length);
  const currentProject = currentFileEndPath.split(path.sep)[0];

  // sourcePath is the path in the import statement, eg "src/theme"
  // So return path to file in *this* project: eg "c:\git\Monorepo\components\src\theme"
  // out of the box module-resolver was previously returning the app folder eg "c:\git\Monorepo\app1\src\theme"
  const correctResolvedPath = path.join(
    basePath,
    currentProject,
    `./${sourcePath}`,
  );

  return correctResolvedPath;
};

module.exports = function(api) {
  api.cache(true);

  const presets = [
    'next/babel',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];
  // console.log(getResolverAlias(__dirname));
  const plugins = [
    'styled-components',
    [
      'module-resolver',
      {
        // cwd: 'babelrc', // use the local babel.config.js in each project
        alias: getResolverAlias(__dirname),
        resolvePath: fixResolvePath(__dirname)
      }
    ]
  ];

  return {
    presets,
    plugins,
    // babelrcRoots: [
    //   // Keep the root as a root
    //   ".",
    //
    //   // Also consider monorepo packages "root" and load their .babelrc files.
    //   "../*"
    // ]
  };
};
