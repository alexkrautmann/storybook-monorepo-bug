/**
 * Create alias setting for module-resolver plugin based off tsconfig.json paths
 *
 * Before in tsconfig.json in project:
 *
 "paths": {
      "src/*": ["src/*"],
      "@blah/components/*": ["../components/src/*"],
    },
 *
 *
 * After to pass as `alias` key in 'module-resolver' plugin:
 *
 "alias": {
      "src": ["./src"],
      "@blah/components": ["./../components/src"],
    },
 *
 */
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
      const paths = pathArray.map(p => `./${p.replace('*/', '\\1/')}`);
      return { key, paths };
    })
    .reduce((obj, cur) => {
      obj[cur.key] = cur.paths; // eslint-disable-line no-param-reassign
      return obj;
    }, {});

  return pathAlias;
};

/**
 * Also add special resolving of the "src" tsconfig paths.
 * This is so "src" used within the common projects (eg within components) correctly resolves
 *
 * eg In app1 project if you import `@blah/components/Foo` which in turn imports `src/theme`
 * then for `@blah/components/Foo/Foo.tsx` existing module resolver incorrectly looks for src/theme`
 * within `app1` folder not `components`
 *
 * This now returns:`c:\git\Monorepo\components\src\theme`
 * Instead of: `c:\git\Monorepo\app1\src\theme`
 */
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
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
  ];


  const plugins = [
    // [
    //   // Create alias paths for module-resolver plugin based off tsconfig.json paths
    //   'module-resolver',
    //   {
    //     cwd: 'babelrc', // use the local babel.config.js in each project
    //     root: ['./'],
    //     alias: getResolverAlias(projectDir),
    //     resolvePath: fixResolvePath(projectDir),
    //   },
    // ],
  ];

  return {
    presets,
    plugins,
  };
};

module.exports = {
  getBabelConfig,
};
