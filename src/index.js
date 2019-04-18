import NodeEnv from './node'
import setup from './common'

/**
 * Creates a function to log messages.
 * @param {string} namespace
 */
export default function(namespace) {
  const node = setup(NodeEnv)
  const debug = node(namespace)
  return debug
}

/* typal types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_debug.Env} Env An environment.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _debug.Env An environment.
 * @prop {!Function} init Env-specific initialization logic for `debug` instances.
 * @prop {!Function} log The logging function.
 * @prop {function(this:_debug.DebugContext, !Array)} formatArgs Apply env-specific formatting (colors, etc.).
 * @prop {!Function} save Save `namespaces`.
 * @prop {!Function} load Load `namespaces`.
 * @prop {!Function} useColors Is stdout a TTY? Colored output is enabled when `true`.
 * @prop {!Array<number>} colors The array of supported colors.
 * @prop {!Object<string, *>} inspectOpts The options from the env variables, e.g., `DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_debug.DebugContext} DebugContext
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _debug.DebugContext
 * @prop {string} namespace The namespace for which the debug was setup.
 * @prop {boolean} enabled Whether the debug function is enabled.
 * @prop {boolean} useColors If the environment uses colors.
 * @prop {number} diff The diff between the prev time and current time.
 * @prop {number} prev The previous time.
 * @prop {number} curr The current time.
 * @prop {number|string} color The color for the namespace.
 * @prop {!Function} destroy Removes the debug function from the namespace.
 * @prop {!Function} extend Using the debug function, creates a new one.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_debug.DebugFunction} DebugFunction The setup debug function.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {function(...*)} _debug.DebugFunction The setup debug function.
 */
