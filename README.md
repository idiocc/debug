# @idio/debug

[![npm version](https://badge.fury.io/js/%40idio%2Fdebug.svg)](https://npmjs.org/package/@idio/debug)

`@idio/debug` is the fork of the popular [`debug`](https://github.com/visionmedia/debug/) package that was rewritten in modern JS using the ES6 modules, to be able to compile it with _Google Closure Compiler_. Currently, only the _Node.JS_ version is supported.

```sh
yarn add -E @idio/debug
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`debug(namespace: string): debugFunction`](#debugnamespace-string-debugfunction)
  * [`_debug.Env`](#type-_debugenv)
  * [`_debug.DebugContext`](#type-_debugdebugcontext)
  * [`_debug.DebugFunction`](#type-_debugdebugfunction)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import debug from '@idio/debug'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `debug(`<br/>&nbsp;&nbsp;`namespace: string,`<br/>`): debugFunction`

Creates a debug function for the given namespace.

__<a name="type-_debugenv">`_debug.Env`</a>__: An environment.

|       Name       |                       Type                        |                                                                     Description                                                                      |
| ---------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| __init*__        | _function(_debug.DebugFunction)_                  | Env-specific initialization logic for `debug` instances.                                                                                             |
| __log*__         | _function(...*)_                                  | The logging function.                                                                                                                                |
| __formatArgs*__  | _function(this:_debug.DebugFunction, !Array)_     | Apply env-specific formatting (colors, etc.).                                                                                                        |
| __save*__        | _!Function_                                       | Save `namespaces`.                                                                                                                                   |
| __load*__        | _!Function_                                       | Load `namespaces`.                                                                                                                                   |
| __formatters*__  | _Object&lt;string, function(!Object): string&gt;_ | Map of special "%n" handling functions, for the debug "format" argument. Valid key names are a single, lower or upper-case letter, i.e. "n" and "N". |
| __useColors*__   | _!Function_                                       | Is stdout a TTY? Colored output is enabled when `true`.                                                                                              |
| __colors*__      | _!Array&lt;number&gt;_                            | The array of supported colors.                                                                                                                       |
| __inspectOpts*__ | _!Object&lt;string, *&gt;_                        | The options from the env variables, e.g., `DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js`.                                 |

__<a name="type-_debugdebugcontext">`_debug.DebugContext`</a>__

|      Name      |                                    Type                                     |                                  Description                                   |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| __namespace*__ | _string_                                                                    | The namespace for which the debug function was setup.                          |
| __enabled*__   | _boolean_                                                                   | Whether the debug function is enabled.                                         |
| __useColors*__ | _boolean_                                                                   | If the environment uses colors.                                                |
| __diff*__      | _number_                                                                    | The diff between the prev time and current time.                               |
| __prev*__      | _number_                                                                    | The previous time.                                                             |
| __curr*__      | _number_                                                                    | The current time.                                                              |
| log            | _function(...*)_                                                            | The manually set logging function that overrides the environment log function. |
| __color*__     | _(number \| string)_                                                        | The color for the namespace.                                                   |
| __destroy*__   | _function(this:_debug.DebugFunction): boolean_                              | Removes the debug function from the namespace.                                 |
| __extend*__    | _function(this:_debug.DebugFunction, string, string): _debug.DebugFunction_ | Using the debug function, creates a new one.                                   |

`function(this:_debug.DebugContext, ...*) & _debug.DebugContext` __<a name="type-_debugdebugfunction">`_debug.DebugFunction`</a>__: The setup debug function.

```js
import debug from '@idio/debug'

const log = debug('example')
log('hello')
log('world')
```
```
2019-04-19T01:59:18.226Z example hello
2019-04-19T01:59:18.229Z example world
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>