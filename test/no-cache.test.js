'use strict';

const { fs } = require('mz');
const path = require('path');
const mock = require('egg-mock');
const assert = require('assert');

describe('test/no-cache.test.js', () => {
  let app;
  let ctx;
  let templateFilePath;
  let templateContent;

  before(async () => {
    mock.env('local');
    app = mock.app({
      baseDir: 'apps/no-cache',
      cache: false,
    });
    await app.ready();
    ctx = app.mockContext();
    templateFilePath = path.join(app.config.baseDir, 'app/public/index.html');
    templateContent = await fs.readFile(templateFilePath, { encoding: 'utf-8' });
  });

  after(() => app.close());
  afterEach(mock.restore);
  afterEach(() => fs.writeFile(templateFilePath, templateContent));

  it('should not cache', async () => {
    await ctx.render('index.html');
    assert(ctx.body === 'this is app/public/index.html');

    await fs.writeFile(templateFilePath, 'TEMPLATE CHANGED');

    await ctx.render('index.html');
    assert(ctx.body === 'TEMPLATE CHANGED');
  });
});
