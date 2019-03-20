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
  console.log(basePath);

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

const getBabelConfig = (projectDir) => {
  // const isJest = process.env.NODE_ENV === 'test';

  const presets = [
    // [
    //   '@babel/env',
    //   {
    //     // normally don't transpile import statements so webpack can do tree shaking
    //     // for jest however (NODE_ENV=test) need to transpile import statements
    //     modules: isJest ? 'auto' : false,
    //     // pull in bits you need from babel polyfill eg regeneratorRuntime etc
    //     useBuiltIns: 'usage',
    //     targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
    //   },
    // ],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];


  const plugins = [
    [
      'module-resolver',
      {
        // cwd: 'babelrc', // use the local babel.config.js in each project
        // cwd: 'packagejson', // use the local babel.config.js in each project
        alias: getResolverAlias(projectDir),
        resolvePath: fixResolvePath(projectDir),
        // root: './',
        // loglevel: 'info',
        // extensions: [
        //   '.ts',
        //   '.ios.ts',
        //   '.android.ts',
        //   '.tsx',
        //   '.ios.tsx',
        //   '.android.tsx',
        //   '.js',
        //   '.ios.js',
        //   '.android.js',
        //   '.jsx',
        //   '.ios.jsx',
        //   '.android.jsx',
        //   '.json'
        // ],
      }
    ]
  ];

  return {
    presets,
    plugins,
  };
};

module.exports = {
  getBabelConfig,
};
