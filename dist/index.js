"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_local_icon_font_1 = require("antd-local-icon-font");
var rm = require('rimraf');
/**
 * replace icon fonts and clean map files
 * @param options
 */
exports.clean = function (options) {
    antd_local_icon_font_1.default(options);
};
exports.deleteFiles = function (globFile) {
    if (globFile === void 0) { globFile = 'build/**/*.map'; }
    rm(globFile);
};
//# sourceMappingURL=index.js.map