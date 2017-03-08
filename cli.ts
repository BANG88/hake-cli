#!/usr/bin/env node
var fs = require('fs');
var meow = require('meow');

import { clean, deleteFiles, generate, } from './index'

const cli: { input: string[], flags: { [key: string]: any, destBasePath: string } } = meow([
    `
    Usage

        $ hake clean            remove or replace any content we don't need
        $ hake g|generate       generate a new component

    Options

        $ hake clean 
        --optimize also delete map files
            Replace fonts options 
                --baseDir  
                --cssPath  
                --fontsPathToSave      
                --newFontsPath       
            Remove files 
                --files a glob pattern for remove 

        $ hake generate
        --name specify the generator's name default is route
        --destBasePath specify the dest path default is ./src 

    Examples
        $ hake clean
        $ hake g 

    `
]);

const subCommands: string[] = cli.input

if (subCommands.length) {
    const command = subCommands[0]
    switch (command) {
        case 'clean':
            if (cli.flags.optimize) {
                deleteFiles(cli.flags.files)
            } else {
                clean(cli.flags)
            }
            break;
        case 'generate':
        case 'g':
            const { name = 'route', ...cfg } = cli.flags
            generate(name, { destBasePath: './', ...cfg })
            break;
        default:
            console.log(`Command ${command} Not Found.`);
            break;
    }
}
