"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_local_icon_font_1 = require("antd-local-icon-font");
var rm = require('rimraf');
var chalk = require('chalk');
var nodePlop = require('node-plop');
var path = require("path");
var fs = require("fs");
var appRoot = require('app-root-path');
/**
 * replace icon fonts and clean map files
 * @param options
 */
exports.clean = function (options) {
    antd_local_icon_font_1.default(options);
};
exports.deleteFiles = function (globFile) {
    if (globFile === void 0) { globFile = 'build/**/*.map'; }
    rm(globFile, function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Files removed.');
        }
    });
};
/**
 * generate
 * @param generator generator name
 * @param plopCfg plopCfg
 */
exports.generate = function (generator, plopCfg) {
    var generators;
    var rootGenerators = appRoot.resolve('/generators/index.js');
    if (!fs.existsSync(rootGenerators)) {
        rootGenerators = path.resolve('node_modules/hake-cli/generators/index.js');
    }
    var plop = nodePlop(rootGenerators, plopCfg);
    generators = plop.getGeneratorList();
    // fix if no generators found in current project
    if (!generator) {
        chooseOptionFromList(generators).then(function (generatorName) {
            doThePlop(plop.getGenerator(generatorName));
        });
    }
    else if (generators.map(function (v) { return v.name; }).indexOf(generator) > -1) {
        doThePlop(plop.getGenerator(generator));
    }
    else {
        console.error(chalk.red('[PLOP] ') + 'Generator "' + generator + '" not found in plopfile');
        process.exit(1);
    }
};
/**
 * choose  option from list
 * @param plopList plop generators
 */
function chooseOptionFromList(plopList) {
    var plop = nodePlop();
    var generator = plop.setGenerator('choose', {
        prompts: [{
                type: 'list',
                name: 'generator',
                message: chalk.blue('[PLOP]') + ' Please choose a generator.',
                choices: plopList.map(function (p) {
                    return {
                        name: p.name + chalk.gray(!!p.description ? ' - ' + p.description : ''),
                        value: p.name
                    };
                })
            }]
    });
    return generator.runPrompts().then(function (results) { return results.generator; });
}
/////
// everybody to the plop!
//
function doThePlop(generator) {
    generator.runPrompts().then(generator.runActions)
        .then(function (result) {
        result.changes.forEach(function (line) {
            console.log(chalk.green('[SUCCESS]'), line.type, line.path);
        });
        result.failures.forEach(function (line) {
            var logs = [chalk.red('[FAILED]')];
            if (line.type) {
                logs.push(line.type);
            }
            if (line.path) {
                logs.push(line.path);
            }
            var error = line.error || line.message;
            logs.push(chalk.red(error));
            console.log.apply(console, logs);
        });
    })
        .catch(function (err) {
        console.error(chalk.red('[ERROR]'), err.message, err.stack);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map