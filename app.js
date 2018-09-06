'use strict';

module.exports = app => {
  app.view.use('static', require('./lib/view'));
  // `app.config.static.dir` maybe String | String[]
  const staticDir = [].concat(app.config.static.dir);
  app.view.config.root.push(...staticDir);
};
