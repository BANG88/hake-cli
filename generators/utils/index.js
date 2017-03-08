const changeCase = require('change-case')
const fs = require('fs')

/**
 * find nested route by a given path
 * @param  {string} path /room/detail
 */
exports.findNestedRoute = (path) => {
  return path
}

/**
 * get route name by path
 * use case: /account/detail , we peek detail as our route name
 * @param  {string} path
 * @param  {string} fileName
 */
const getPath = ({ path, isSubRoute }, fileName) => {
  fileName = fileName || '{{properCase name}}.tsx'
  if (!isSubRoute) {
    return `src/routes/{{properCase name}}/${fileName}`
  }
  const properCasePath = path.split('/')
    .map(p => `${changeCase.pascal(p)}`)
    .join('/')

  return `src/routes${properCasePath}/${fileName}`
}

exports.getPath = getPath

/**
 * check a given input is a sub route path
 * @param {string} input
 */
exports.isSubRoute = input => input.split('/').length > 2

/**
 * get prev path
 * @param  {string} path
 * @param  {boolean} prefix
 */
function getPrevPath({ path, isSubRoute }) {
  const p = path.substr(0, path.lastIndexOf('/'))
  if (!isSubRoute) return path
  // if (!prefix) return `${p}/route.js`
  return getPath({ path: p, isSubRoute }, 'route.js')
}
exports.getPrevPath = getPrevPath

/**
 * @param  {string} route
 */
exports.checkRouteExists = (path) => {
  return fs.existsSync(getPrevPath(path))
}
