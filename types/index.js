export {}

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_debug.Env} Env `＠record` An environment.
 */
/**
 * @typedef {Object} _debug.Env `＠record` An environment.
 * @prop {function(_debug.DebugFunction)} init Env-specific initialization logic for `debug` instances.
 * @prop {function(...*)} log The logging function.
 * @prop {function(this:_debug.DebugFunction, !Array)} formatArgs Apply env-specific formatting (colors, etc.).
 * @prop {!Function} save Save `namespaces`.
 * @prop {!Function} load Load `namespaces`.
 * @prop {Object<string, function(!Object): string>} formatters Map of special "%n" handling functions, for the debug "format" argument. Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 * @prop {!Function} useColors Is stdout a TTY? Colored output is enabled when `true`.
 * @prop {!Array<number>} colors The array of supported colors.
 * @prop {!Object<string, *>} inspectOpts The options from the env variables, e.g., `DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js`.
 */
/**
 * @typedef {_debug.DebugContext} DebugContext `＠record`
 */
/**
 * @typedef {Object} _debug.DebugContext `＠record`
 * @prop {string} namespace The namespace for which the debug function was setup.
 * @prop {boolean} enabled Whether the debug function is enabled.
 * @prop {boolean} useColors If the environment uses colors.
 * @prop {number} diff The diff between the prev time and current time.
 * @prop {number} prev The previous time.
 * @prop {number} curr The current time.
 * @prop {function(...*)} [log] The manually set logging function that overrides the environment log function.
 * @prop {(number|string)} color The color for the namespace.
 * @prop {function(this:_debug.DebugFunction): boolean} destroy Removes the debug function from the namespace.
 * @prop {function(this:_debug.DebugFunction, string, string): _debug.DebugFunction} extend Using the debug function, creates a new one.
 */
/**
 * @typedef {_debug.DebugFunction} DebugFunction The setup debug function.
 */
/**
 * @typedef {_debug.DebugContext & _debug.$DebugFunction} _debug.DebugFunction The setup debug function.
 */
/**
 * @typedef {function(this:_debug.DebugContext, ...*)} _debug.$DebugFunction The setup debug function.
 */
