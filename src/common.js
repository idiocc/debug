class Debug {
  /**
   * Create a debugger with the given `namespace`.
   * @param {_debug.Env} env
   */
  constructor(env) {
    this.colors = env.colors
    this.formatArgs = env.formatArgs
    this.inspectOpts = env.inspectOpts
    this.log = env.log
    this.save = env.save
    this.init = env.init

    /**
     * Active `debug` instances.
     * @type {Array<_debug.DebugFunction>}
     */
    this.instances = []
    /**
	   * The currently active debug mode names.
     * @type {Array<!RegExp>}
	   */
    this.names = []
    /**
	   * The currently active names to skip.
     * @type {Array<!RegExp>}
	   */
    this.skips = []

    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */
    this.formatters = {}
  }
  createDebug() {
    const debug = this.getDebug()

    // env-specific initialization logic for debug instances
    if (typeof this.init == 'function') {
      this.init(debug)
    }

    this.instances.push(debug)
    return debug
  }

  /**
   * @returns {_debug.DebugFunction}
   */
  getDebug() {
    const formatters = this.formatters
    const formatArgs = this.formatArgs
    const log = this.log // comes from the env

    /** @type {number} */
    let prevTime
    /** @type {_debug.DebugFunction} */
    function debug(...args) {
      if (!debug.enabled) return

      // Set `diff` timestamp
      const curr = Number(new Date())
      const time = curr - (prevTime || curr)
      debug.diff = time
      debug.prev = prevTime
      debug.curr = curr
      prevTime = curr

      args[0] = coerce(args[0])

      if (typeof args[0] != 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O')
      }

      // Apply any `formatters` transformations
      let index = 0
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match
        }
        index++
        const formatter = formatters[format]
        if (typeof formatter === 'function') {
          const val = args[index]
          match = formatter.call(debug, val)

          // Now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1)
          index--
        }
        return match
      })

      // Apply env-specific formatting (colors, etc.)
      formatArgs.call(debug, args)

      const logFn = debug.log || log
      logFn.apply(debug, args)
    }
    return debug
  }
  /**
	 * Selects a color for a debug namespace
	 * @param {string} namespace The namespace string for the for the debug instance to be colored
	 * @return {number|string} An ANSI color code for the given namespace
	 */
  selectColor(namespace) {
    let hash = 0

    for (let i = 0; i < namespace.length; i++) {
      hash = ((hash << 5) - hash) + namespace.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return this.colors[Math.abs(hash) % this.colors.length]
  }
  /**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {string} namespaces
	 * @api public
	 */
  enable(namespaces) {
    this.save(namespaces)

    this.names = []
    this.skips = []

    let i
    const split = (typeof namespaces == 'string' ? namespaces : '').split(/[\s,]+/)
    const len = split.length

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue
      }

      namespaces = split[i].replace(/\*/g, '.*?')

      if (namespaces[0] == '-') {
        this.skips.push(new RegExp('^' + namespaces.substr(1) + '$'))
      } else {
        this.names.push(new RegExp('^' + namespaces + '$'))
      }
    }

    for (i = 0; i < this.instances.length; i++) {
      const instance = this.instances[i]
      instance.enabled = this.enabled(instance.namespace)
    }
  }
  destroy(debug) {
    const index = this.instances.indexOf(debug)
    if (index !== -1) {
      this.instances.splice(index, 1)
      return true
    }
    return false
  }
  /**
	 * Disable debug output.
	 * @return {string} namespaces
	 */
  disable() {
    const namespaces = [
      ...this.names.map(toNamespace),
      ...this.skips.map(toNamespace).map(namespace => '-' + namespace),
    ].join(',')
    this.enable('')
    return namespaces
  }
  /**
	 * Returns true if the given mode name is enabled, false otherwise.
	 * @param {string} name
	 * @return {boolean}
	 */
  enabled(name) {
    if (name[name.length - 1] == '*') {
      return true
    }

    let i
    let len

    for (i = 0, len = this.skips.length; i < len; i++) {
      if (this.skips[i].test(name)) {
        return false
      }
    }

    for (i = 0, len = this.names.length; i < len; i++) {
      if (this.names[i].test(name)) {
        return true
      }
    }

    return false
  }
}

/**
 * @param {string} namespace
 * @this {_debug.DebugContext}
 */
function extend(namespace, delimiter) {

}

/**
 * This is the common logic for both the Node.js and web browser implementations of `debug()`.
 * @param {_debug.Env} env
 */
export default function setup(env) {
  const instance = new Debug(env)

  /**
   * Creates a function to log messages.
   * @param {string} namespace
   */
  function createDebug(namespace) {
    const debug = instance.createDebug()

    debug.namespace = namespace
    debug.useColors = env.useColors()
    debug.enabled = instance.enabled(namespace)
    debug.color = instance.selectColor(namespace)
    /** @this {_debug.DebugContext} */
    debug.destroy = function() {
      instance.destroy(this)
    }
    /** @this {_debug.DebugContext} */
    debug.extend = function(ns, delimiter) {
      const newDebug = (this.namespace + (delimiter === undefined ? ':' : delimiter) + ns)
      newDebug.log = this.log // don't know why this is here
      return newDebug
    }

    instance.enable(env.load())

    return debug
  }
  return createDebug
}

/**
 * Convert regexp to namespace.
 *
 * @param {!RegExp} regexp
 * @return {string} namespace
 * @private
 */
function toNamespace(regexp) {
  return regexp.toString()
    .substring(2, regexp.toString().length - 2)
    .replace(/\.\*\?$/, '*')
}

/**
 * Coerce `val`.
 * @param {!Error|*} val
 * @return {*}
 * @private
 */
function coerce(val) {
  if (val instanceof Error) {
    return val.stack || val.message
  }
  return val
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('.').Env} _debug.Env
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('.').DebugFunction} _debug.DebugFunction
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('.').DebugContext} _debug.DebugContext
 */