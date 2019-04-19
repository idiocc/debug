/* typal types/index.xml */
/** @const */
var _debug = {}
/**
 * @typedef {{ init: function(_debug.DebugFunction), log: function(...*), formatArgs: function(this:_debug.DebugFunction, !Array), save: !Function, load: !Function, formatters: Object<string, function(!Object): string>, useColors: !Function, colors: !Array<number>, inspectOpts: !Object<string, *> }}
 */
_debug.Env
/**
 * @typedef {{ namespace: string, enabled: boolean, useColors: boolean, diff: number, prev: number, curr: number, log: (function(...*)|undefined), color: (number|string), destroy: function(this:_debug.DebugFunction): boolean, extend: function(this:_debug.DebugFunction, string, string): _debug.DebugFunction }}
 */
_debug.DebugContext
/**
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