'use strict';

/**
 * egg-view-static default config
 * @member Config#viewStatic
 * @property {Boolean} cache - whether cache file, default to `true` except `local` mode. It will share cache with `egg-static` LRU cache.
 * @property {Function} replaceFn - custom render replacement, args = (tpl, locals, options)
 */
exports.viewStatic = {
  cache: true,
  replaceFn: undefined,
};
