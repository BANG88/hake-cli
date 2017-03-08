#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var meow = require('meow');
var index_1 = require("./index");
var cli = meow([
    "Usage\n        $ hake clean\n\n    Options\n        --optimize also delete map files\n\n            Replace fonts options \n                --baseDir  \n                --cssPath  \n                --fontsPathToSave      \n                --newFontsPath       \n\n            Remove files \n                --files a glob pattern for remove \n\n    Examples\n        $ hake clean\n    "
]);
var subCommands = cli.input;
if (subCommands.length) {
    var command = subCommands[0];
    switch (command) {
        case 'clean':
            index_1.clean(cli.flags);
            if (cli.flags.optimize) {
                index_1.deleteFiles(cli.flags.files);
            }
            break;
        default:
            console.log("Command " + command + " Not Found.");
            break;
    }
}
//# sourceMappingURL=cli.js.map