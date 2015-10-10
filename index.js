/**
 * Module Dependencies
 */

var chalk = require('chalk')

/**
 * Export `middleware`
 */

module.exports = middleware

/**
 * Chalk strings
 */

var title_string = chalk.bold(chalk.underline('action %s @ %s'))
var prev_string = chalk.gray('prev state')
var action_string = chalk.blue('action')
var next_string = chalk.green('next state')

/**
 * Initialize the middleware
 *
 * @param {Function} fn
 * @param {Object} options
 */

function middleware (fn, options) {
  fn = fn || function () {}
  options = options || {}

  // should the state be collapsed or not?
  var collapsed = options.collapsed === undefined ? false : true

  return function (store) {
    return function (next) {
      return function (action) {
        var time = new Date()
        var formatted = pad(time.getHours(), 2)
          + ':' + pad(time.getMinutes(), 2)
          + ':' + pad(time.getSeconds(), 2)
          + '.' + pad(time.getMilliseconds(), 3)

        fn(title_string, action.type, formatted)
        !collapsed && fn('|  %s %o', prev_string, store.getState())
        !collapsed && fn('|  %s %o', action_string, action)
        var return_value = next(action)
        !collapsed && fn('|  %s %o', next_string, store.getState())

        return return_value
      }
    }
  }
}

/**
 * Add padding
 *
 * @param {String} num
 * @param {Number} max_length
 * @return {String}
 */

function pad (str, max_length) {
  var len = str.toString().length
  var out = ''
  for (var i = 0; i < max_length - len; i++) {
    out += '0'
  }
  return out + num
}
