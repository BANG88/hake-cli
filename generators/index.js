/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const routeGenerator = require('./route/index')


module.exports = (plop) => {
  plop.setGenerator('route', routeGenerator)

  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(`src/containers/${comp}`, fs.F_OK)
      return `containers/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('route', (comp) => {
    return `./${comp}/route`
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
