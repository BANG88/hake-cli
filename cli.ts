#!/usr/bin/env node

'use strict';
var fs = require('fs');
var meow = require('meow');

import { clean, deleteFiles } from './index'

const cli = meow([
    `Usage
        $ hake clean

    Options
        --optimize also delete map files

            Replace fonts options 
                --baseDir  
                --cssPath  
                --fontsPathToSave      
                --newFontsPath       

            Remove files 
                --files a glob pattern for remove 

    Examples
        $ hake clean
    `
]);

const subCommands: string[] = cli.input

if (subCommands.length) {
    const command = subCommands[0]
    switch (command) {
        case 'clean':
            clean(cli.flags)
            if (cli.flags.optimize) {
                deleteFiles(cli.flags.files)
            }
            break;
        default:
            console.log(`Command ${command} Not Found.`);
            break;
    }
}
