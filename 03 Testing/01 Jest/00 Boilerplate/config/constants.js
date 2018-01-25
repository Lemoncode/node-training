const { resolveFromRootPath } = require('./helpers');

exports.paths = {
  ts: resolveFromRootPath('./src/**/*.ts'),
  output: resolveFromRootPath('./public'),
  tslintConfig: resolveFromRootPath('./tslint.json'),
};
