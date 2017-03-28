#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require('fs');
var meow = require('meow');
var index_1 = require("./index");
var cli = meow([
    "\n    Usage\n\n        $ hake clean            remove or replace any content we don't need\n        $ hake g|generate       generate a new component\n\n    Options\n\n        $ hake clean \n        --optimize also delete map files\n            Replace fonts options \n                --baseDir  \n                --cssPath  \n                --fontsPathToSave      \n                --newFontsPath       \n            Remove files \n                --files a glob pattern for remove \n\n        $ hake generate\n        --name specify the generator's name default is route\n        --destBasePath specify the dest path default is ./src \n\n    Examples\n        $ hake clean\n        $ hake g \n\n    "
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
        case 'generate':
        case 'g':
            var _a = cli.flags, _b = _a.name, name_1 = _b === void 0 ? 'route' : _b, cfg = tslib_1.__rest(_a, ["name"]);
            index_1.generate(name_1, tslib_1.__assign({ destBasePath: './' }, cfg));
            break;
        default:
            console.log("Command " + command + " Not Found.");
            break;
    }
}
//# sourceMappingURL=cli.js.map