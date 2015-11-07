/**
 * Module Dependencies
 */

var strip_ansi = require('strip-ansi')
var inspect = require('util-inspect')
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
        !collapsed && fn('|  %s %s', prev_string, fmt(store.getState()))
        !collapsed && fn('|  %s %s', action_string, fmt(action))
        var return_value = next(action)
        !collapsed && fn('|  %s %s', next_string, fmt(store.getState()))

        return return_value
      }
    }
  }
}

/**
 * Formatting
 */

function fmt (v) {
  var str = inspect(v, { colors: true })
    .replace(/\s*\n\s*/g, ' ');

  if (typeof window !== 'undefined') {
    return strip_ansi(str)
  }
}

/**
 * Add padding
 *
 * @param {String} str
 * @param {Number} max_length
 * @return {String}
 */

function pad (str, max_length) {
  var len = str.toString().length
  var out = ''
  for (var i = 0; i < max_length - len; i++) {
    out += '0'
  }
  return out + str
}
