# egg-view-static

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-view-static.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-view-static
[travis-image]: https://img.shields.io/travis/eggjs/egg-view-static.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-view-static
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-view-static.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-view-static?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-view-static.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-view-static
[snyk-image]: https://snyk.io/test/npm/egg-view-static/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-view-static
[download-image]: https://img.shields.io/npm/dm/egg-view-static.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-view-static

A simple egg view plugin, allow you to render static html from `app/public`.

## Install

```bash
$ npm i egg-view-static --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.viewStatic = {
  enable: true,
  package: 'egg-view-static',
};
```

Set mapping in config

```js
// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'static',
  mapping: {
    '.html': 'static',
  },
};
```

Render in controller

```js
// {app_root}/app/controller/home.js
class HomeController extends Controller {
  async index() {
    // app/static/index.html
    await this.ctx.render('index.html');
  }
}
```

Use `replaceFn` to custom render with locals, see [test/fixtures/apps/locals/config/config.default.js](test/fixtures/apps/locals/config/config.default.js) for more detail.

```js
// {app_root}/config/config.default.js
config.viewStatic = {
  replaceFn(tpl, locals) {
    return tpl.toString().replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length);
      }
      return locals.hasOwnProperty(key) ? locals[key] : block;
    });
  },
};

// {app_root}/app/controller/home.js
class HomeController extends Controller {
  async index() {
    // app/static/index.html
    await this.ctx.render('index.html', { name: 'egg' });
  }
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.viewStatic = {
  // cache: true,
  // replaceFn: (tpl, locals, options) => tpl,
};
```

- {Boolean} `cache` - whether cache file, default to `true` except `local` mode. **It will share cache with `egg-static` LRU cache**.
- {Function} `replaceFn` - custom render replacement, args = `(tpl, locals, options)`

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
