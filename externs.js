/* typal types/index.xml */
/** @const */
var _debug = {}
/**
 * @typedef {{ init: !Function, log: !Function, formatArgs: function(this:_debug.DebugContext, !Array), save: !Function, load: !Function, useColors: !Function, colors: !Array<number>, inspectOpts: !Object<string, *> }}
 */
_debug.Env
/**
 * @typedef {{ namespace: string, enabled: boolean, useColors: boolean, diff: number, prev: number, curr: number, color: number|string, destroy: !Function, extend: !Function }}
 */
_debug.DebugContext
/**
 * @typedef {function(...*)}
 */
_debug.DebugFunction
