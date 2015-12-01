  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'static';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  });