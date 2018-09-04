'use strict';

const { fs } = require('mz');

class StaticView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = this.app.config.viewStatic;
  }

  async render(name, locals, options) {
    // share cache with `egg-static` LRU
    const cache = this.app.config.static.files;
    let tpl;
    if (cache && this.config.cache) {
      tpl = cache.get(name);
      if (!tpl) {
        tpl = await fs.readFile(name, 'utf-8');
        cache.set(name, tpl);
      }
    } else {
      tpl = await fs.readFile(name, 'utf-8');
    }
    return await this.renderString(tpl, locals, options);
  }

  async renderString(tpl, locals, options) {
    if (!this.config.replaceFn) return tpl;

    return this.config.replaceFn(tpl, locals, options);
  }
}

module.exports = StaticView;
