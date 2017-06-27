import antdIconReplacer from 'antd-local-icon-font'
const rm = require('rimraf')
const chalk = require('chalk');
const nodePlop = require('node-plop');
import * as path from 'path'
import * as fs from 'fs'
const appRoot = require('app-root-path');
/**
 * replace icon fonts and clean map files  
 * @param options 
 */
export const clean = (options) => {
    antdIconReplacer(options)
}

export const deleteFiles = (globFile = 'build/**/*.map') => {
    rm(globFile, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Files removed.')
        }
    })
}
/**
 * generate 
 * @param generator generator name 
 * @param plopCfg plopCfg
 */
export const generate = (generator?: string, plopCfg?) => {
    let generators
    let rootGenerators = appRoot.resolve('/generators/index.js')
    if(!fs.existsSync(rootGenerators)){
        rootGenerators = path.resolve('node_modules/hake-cli/generators/index.js')
    }
    const plop = nodePlop(rootGenerators, plopCfg)
    generators = plop.getGeneratorList();
    // fix if no generators found in current project
    if (!generator) {
        chooseOptionFromList(generators).then(function (generatorName) {
            doThePlop(plop.getGenerator(generatorName));
        });
    } else if (generators.map(function (v) { return v.name; }).indexOf(generator) > -1) {
        doThePlop(plop.getGenerator(generator));
    } else {
        console.error(chalk.red('[PLOP] ') + 'Generator "' + generator + '" not found in plopfile');
        process.exit(1);
    }
}
/**
 * choose  option from list
 * @param plopList plop generators
 */
function chooseOptionFromList(plopList) {
    const plop = nodePlop();
    const generator = plop.setGenerator('choose', {
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
    return generator.runPrompts().then(results => results.generator);
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
                if (line.type) { logs.push(line.type); }
                if (line.path) { logs.push(line.path); }

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