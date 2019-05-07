const _Debug = require('./depack')

/**
 * Creates a function to log messages.
 * @param {string} namespace
 * @return {(...message: string)} The function for logging.
 */
function debug(namespace) {
  return _Debug(namespace)
}

module.exports = debug