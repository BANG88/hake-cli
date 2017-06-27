/**
 * Route Generator
 */

// const componentExists = require('../utils/componentExists')
const { getPath, getPrevPath, isSubRoute,checkRouteExists } = require('../utils')
module.exports = {
  description: 'Add a Route',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true // componentExists(value) ? 'A route with this name already exists' : true
      }

      return 'The name is required'
    }
  },
    {
      type: 'input',
      name: 'path',
      message: 'Enter the path of the route.',
      /**
       * @param  {string} value
       */
      validate: (value) => {
        if ((/.+/).test(value)) {
          // console.log(value.substr(0, value.length / 2), getPrevPath(value))

         return true  // checkRouteExists(value) ? true : '没有找到上一级route.js配置'
        }
        return 'path is required'
      },
      filter: (value) => {
        return value.startsWith('/') ? value : `/${value}`
      }
    },
    {
      type: 'confirm',
      name: 'isDataTable',
      default: true,
      message: 'is a datatable route?'
    },
    {
      type: 'input',
      name: 'model',
      message: 'add a model prefix for your Table',
      when: data => data.isDataTable
    },
    {
      type: 'input',
      name: 'url',
      message: 'setup the ajax url for your Table',
      when: data => data.isDataTable,
      filter: (value) => {
        return value.startsWith('/') ? value : `/${value}`
      }
    },
    {
      type: 'confirm',
      name: 'injectAsyncRoute',
      default: false,
      message: 'getChildRoutes'
    },
    {
      type: 'confirm',
      name: 'isSubRoute',
      default: true,
      message: 'is a sub route?',
      when: data => isSubRoute(data.path)
    },

    {
      type: 'confirm',
      name: 'wantCSS',
      default: false,
      message: 'Does it have styling?'
    }, {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: 'Do you want an duck module for this route?',
      when: data => !data.isDataTable
    }, {
      type: 'input',
      name: 'props',
      default: 'item',
      message: 'give a prop name for container?',
      when: data => data.wantActionsAndReducer
    }],
  actions: (data) => {
    // Generate index.js and index.test.js

    // const options = getOptions(data)

    const actions = [
      {
        type: 'add',
        path: getPath(data),
        templateFile: './route/index.js.hbs',
        abortOnFail: true
      },
      // {
      //   type: 'add',
      //   path: getPath(data, 'tests/index.test.js'),
      //   templateFile: './route/test.js.hbs',
      //   abortOnFail: true
      // },
      {
        type: 'add',
        path: getPath(data, 'index.tsx'),
        templateFile: './route/route.js.hbs',
        abortOnFail: true
      }]
 
    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: getPath(data, 'style.css'),
        templateFile: './route/styles.css.hbs',
        abortOnFail: true
      })
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: getPath(data, 'service.tsx'),
        templateFile: './route/module.js.hbs',
        abortOnFail: true
      })
    
    }

    return actions
  }
}
