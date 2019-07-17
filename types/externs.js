/**
 * @fileoverview Debug externs.
 * @externs
 */

/* typal types/index.xml */
/** @const */
var _debug = {}
/**
 * An environment.
 * @record
 */
_debug.Env
/**
 * Env-specific initialization logic for `debug` instances.
 * @type {function(_debug.DebugFunction)}
 */
_debug.Env.prototype.init
/**
 * The logging function.
 * @type {function(...*)}
 */
_debug.Env.prototype.log
/**
 * Apply env-specific formatting (colors, etc.).
 * @type {function(this:_debug.DebugFunction, !Array)}
 */
_debug.Env.prototype.formatArgs
/**
 * Save `namespaces`.
 * @type {!Function}
 */
_debug.Env.prototype.save
/**
 * Load `namespaces`.
 * @type {!Function}
 */
_debug.Env.prototype.load
/**
 * Map of special "%n" handling functions, for the debug "format" argument. Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 * @type {Object<string, function(!Object): string>}
 */
_debug.Env.prototype.formatters
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 * @type {!Function}
 */
_debug.Env.prototype.useColors
/**
 * The array of supported colors.
 * @type {!Array<number>}
 */
_debug.Env.prototype.colors
/**
 * The options from the env variables, e.g., `DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js`.
 * @type {!Object<string, *>}
 */
_debug.Env.prototype.inspectOpts
/**
 * @record
 */
_debug.DebugContext
/**
 * The namespace for which the debug function was setup.
 * @type {string}
 */
_debug.DebugContext.prototype.namespace
/**
 * Whether the debug function is enabled.
 * @type {boolean}
 */
_debug.DebugContext.prototype.enabled
/**
 * If the environment uses colors.
 * @type {boolean}
 */
_debug.DebugContext.prototype.useColors
/**
 * The diff between the prev time and current time.
 * @type {number}
 */
_debug.DebugContext.prototype.diff
/**
 * The previous time.
 * @type {number}
 */
_debug.DebugContext.prototype.prev
/**
 * The current time.
 * @type {number}
 */
_debug.DebugContext.prototype.curr
/**
 * The manually set logging function that overrides the environment log function.
 * @type {(function(...*))|undefined}
 */
_debug.DebugContext.prototype.log
/**
 * The color for the namespace.
 * @type {(number|string)}
 */
_debug.DebugContext.prototype.color
/**
 * Removes the debug function from the namespace.
 * @type {function(this:_debug.DebugFunction): boolean}
 */
_debug.DebugContext.prototype.destroy
/**
 * Using the debug function, creates a new one.
 * @type {function(this:_debug.DebugFunction, string, string): _debug.DebugFunction}
 */
_debug.DebugContext.prototype.extend
/**
 * The setup debug function.
 * @typedef {function(this:_debug.DebugContext, ...*)}
 */
_debug.DebugFunction

/* manual updates to set props on the debug function */
/** @type {string} */
_debug.DebugFunction.namespace
/** @type {boolean} */
_debug.DebugFunction.enabled
/** @type {boolean} */
_debug.DebugFunction.useColors
/** @type {number} */
_debug.DebugFunction.diff
/** @type {number} */
_debug.DebugFunction.prev
/** @type {number} */
_debug.DebugFunction.curr
/** @type {(function(...*)|undefined)} */
_debug.DebugFunction.log
/** @type {number|string} */
_debug.DebugFunction.color
/** @type {function(this:_debug.DebugFunction): boolean} */
_debug.DebugFunction.destroy
/** @type {function(this:_debug.DebugFunction, string, string): _debug.DebugFunction} */
_debug.DebugFunction.extend

/**
 * @type {number}
 */
process.stderr.fd