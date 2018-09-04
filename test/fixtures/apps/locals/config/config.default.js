'use strict';

exports.keys = '123456';

exports.view = {
  mapping: {
    '.html': 'static',
  },
};

exports.viewStatic = {
  /**
   * render template with locals
   *
   * - `{{ test }}` will replace
   * - `\{{ test }}` will skip
   *
   * @param {String} tpl - template content
   * @param {Object} locals - variable scope
   * @return {String} new content
   */
  replaceFn(tpl, locals) {
    return tpl.toString().replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length);
      }
      return locals.hasOwnProperty(key) ? locals[key] : block;
    });
  },
};
