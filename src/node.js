import tty from 'tty'
import util from 'util'
import humanize from 'ms'

const colors = [6, 2, 3, 4, 5, 1]

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */
const inspectOpts = Object.keys(process.env).filter(key => {
  return /^debug_/i.test(key)
}).reduce((obj, key) => {
  // Camel-case
  const prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase()
    })

  // Coerce string value into JS value
  let val = process.env[key]
  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false
  } else if (val === 'null') {
    val = null
  } else {
    val = Number(val)
  }

  obj[prop] = val
  return obj
}, {})

/** @type {Env} */
const NodeEnv = {
  init,
  log,
  formatArgs,
  save,
  load,
  useColors,
  colors,
  inspectOpts,
}

export default NodeEnv

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */
function useColors() {
  return 'colors' in inspectOpts ?
    Boolean(inspectOpts['colors']) :
    tty.isatty(process.stderr.fd)
}

/**
 * Adds ANSI color escape codes if enabled.
 * @param {!Array} args
 * @this {_debug.DebugContext}
 */
function formatArgs(args) {
  const { namespace, useColors, color, diff } = this

  if (useColors) {
    const c = color
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c)
    const prefix = `  ${colorCode};1m${namespace} \u001B[0m`

    args[0] = prefix + args[0].split('\n').join('\n' + prefix)
    args.push(colorCode + 'm+' + humanize(diff) + '\u001B[0m')
  } else {
    args[0] = getDate() + namespace + ' ' + args[0]
  }
}

function getDate() {
  if (inspectOpts['hideDate']) {
    return ''
  }
  return new Date().toISOString() + ' '
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */
function log(...args) {
  return process.stderr.write(util.format(...args) + '\n')
}

/**
 * Save `namespaces`.
 * @param {string} namespaces
 */
function save(namespaces) {
  if (namespaces) {
    process.env['DEBUG'] = namespaces
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env['DEBUG']
  }
}

/**
 * Load `namespaces`.
 * @return {string} returns the previously persisted debug modes
 */

function load() {
  return process.env['DEBUG']
}

/**
 * Init logic for `debug` instances.
 * @param {_debug.DebugFunction} debug
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {}

  const keys = Object.keys(inspectOpts)
  for (let i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = inspectOpts[keys[i]]
  }
}

// /**
//  * Map %o to `util.inspect()`, all on a single line.
//  */
// formatters.o = function (v) {
//   this.inspectOpts.colors = this.useColors
//   return util.inspect(v, this.inspectOpts)
//     .replace(/\s*\n\s*/g, ' ')
// }

// /**
//  * Map %O to `util.inspect()`, allowing multiple lines if needed.
//  */
// formatters.O = function (v) {
//   this.inspectOpts.colors = this.useColors
//   return util.inspect(v, this.inspectOpts)
// }

/**
 * @suppress {nonStandardJsDoc}
 * @typedef {import('.').DebugFunction} _debug.DebugFunction
 */
/**
 * @suppress {nonStandardJsDoc}
 * @typedef {import('.').DebugContext} _debug.DebugContext
 */
/**
 * @suppress {nonStandardJsDoc}
 * @typedef {import('.').Env} _debug.Env
 */