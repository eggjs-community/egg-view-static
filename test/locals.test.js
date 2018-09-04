'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/locals.test.js', () => {
  let app;
  let ctx;

  before(async () => {
    mock.env('unittest');
    app = mock.app({
      baseDir: 'apps/locals',
      cache: false,
    });
    await app.ready();
    ctx = app.mockContext();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should render locals', async () => {
    await ctx.render('index.html', { name: 'egg' });
    assert(ctx.body === 'this is egg');
  });

});
