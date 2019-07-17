const _Debug = require('./debug')

/**
 * Creates a function to log messages.
 * @param {string} namespace
 */
function debug(namespace) {
  return _Debug(namespace)
}

module.exports = debug