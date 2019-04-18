/* typal types/index.xml */
/** @const */
var _debug = {}
/**
 * @typedef {{ namespace: string, enabled: boolean, useColors: boolean, diff: number, prev: number, curr: number, color: (number|string), destroy: function(this:_debug.DebugContext): boolean, extend: function(this:_debug.DebugContext, string, string): _debug.DebugFunction }}
 */
_debug.DebugContext
/**
 * @typedef {{ init: !Function, log: !Function, formatArgs: function(this:_debug.DebugFunction, !Array), save: !Function, load: !Function, useColors: !Function, colors: !Array<number>, inspectOpts: !Object<string, *> }}
 */
_debug.Env
/**
 * @typedef {function(this:_debug.DebugContext, ...*)}
 */
_debug.DebugFunction

/* manual updates */
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
/** @type {number|string} */
_debug.DebugFunction.color
/** @type {function(this:_debug.DebugContext): boolean} */
_debug.DebugFunction.destroy
/** @type {function(this:_debug.DebugContext, string, string): _debug.DebugFunction} */
_debug.DebugFunction.extend
