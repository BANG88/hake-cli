#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require('fs');
var meow = require('meow');
var modular_typescript_import_1 = require("modular-typescript-import");
var index_1 = require("./index");
var cli = meow([
    "\n    Usage\n\n        $ hake clean            remove or replace any content we don't need\n        $ hake modular          modular typescript import\n        $ hake g|generate       generate a new component\n\n    Options\n\n        $ hake clean \n        --optimize also delete map files\n            Replace fonts options \n                --baseDir  \n                --cssPath  \n                --fontsPathToSave      \n                --newFontsPath       \n            Remove files \n                --files a glob pattern for remove \n\n        $ hake modular\n        --pattern  glob pattern match your files [Default: src/**/*.@(tsx|ts)]\n        --dist  the destination will write file to [Default: '']\n\n        $ hake generate\n        --name specify the generator's name default is route\n        --destBasePath specify the dest path default is ./src \n\n    Examples\n        $ hake clean\n        $ hake g \n\n    "
]);
var subCommands = cli.input;
if (subCommands.length) {
    var command = subCommands[0];
    switch (command) {
        case 'clean':
            if (cli.flags.optimize) {
                index_1.deleteFiles(cli.flags.files);
            }
            else {
                index_1.clean(cli.flags);
            }
            break;
        case 'modular':
            var _a = cli.flags, pattern = _a.pattern, dist = _a.dist, options = tslib_1.__rest(_a, ["pattern", "dist"]);
            modular_typescript_import_1.default({ pattern: pattern, dist: dist, options: options });
            break;
        case 'generate':
        case 'g':
            var _b = cli.flags, _c = _b.name, name_1 = _c === void 0 ? 'route' : _c, cfg = tslib_1.__rest(_b, ["name"]);
            index_1.generate(name_1, tslib_1.__assign({ destBasePath: './' }, cfg));
            break;
        default:
            console.log("Command " + command + " Not Found.");
            break;
    }
}
//# sourceMappingURL=cli.js.map