'use strict';

const { fs } = require('mz');
const path = require('path');
const mock = require('egg-mock');
const assert = require('assert');

describe('test/view.test.js', () => {
  let app;
  let ctx;
  let templateFilePath;
  let templateContent;

  before(async () => {
    mock.env('unittest');
    app = mock.app({
      baseDir: 'apps/demo',
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

  it('should render', async () => {
    await ctx.render('index.html');
    assert(ctx.body === 'this is app/public/index.html');
  });

  it('should renderView', async () => {
    const result = await ctx.renderView('index.html');
    assert(result === 'this is app/public/index.html');
  });

  it('should renderString', async () => {
    const result = await ctx.renderString('just a string');
    assert(result === 'just a string');
  });

  it('should cache', async () => {
    await ctx.render('index.html');
    assert(ctx.body === 'this is app/public/index.html');

    await fs.writeFile(templateFilePath, 'TEMPLATE CHANGED');

    await ctx.render('index.html');
    assert(ctx.body === 'this is app/public/index.html');
  });
});
