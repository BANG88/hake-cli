import antdIconReplacer from 'antd-local-icon-font'
const rm = require('rimraf')
/**
 * replace icon fonts and clean map files  
 * @param options 
 */
export const clean = (options) => {
    antdIconReplacer(options)
}

export const deleteFiles = (globFile = 'build/**/*.map') => {
    rm(globFile)
}