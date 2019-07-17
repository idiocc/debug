# @idio/debug

[![npm version](https://badge.fury.io/js/%40idio%2Fdebug.svg)](https://npmjs.org/package/@idio/debug)

`@idio/debug` is the fork of the popular [`debug`](https://github.com/visionmedia/debug/) package that was rewritten in modern JS using the ES6 modules, to be able to compile it with _Closure Compiler_. Currently, only the _Node.JS_ version is supported.

```sh
yarn add @idio/debug
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`debug(namespace: string): debugFunction`](#debugnamespace-string-debugfunction)
  * [`_debug.Env`](#type-_debugenv)
  * [`_debug.DebugContext`](#type-_debugdebugcontext)
  * [`_debug.DebugFunction`](#type-_debugdebugfunction)
- [Modifiers](#modifiers)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import debug from '@idio/debug'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `debug(`<br/>&nbsp;&nbsp;`namespace: string,`<br/>`): debugFunction`

Creates a debug function for the given namespace.

```js
import debug from '@idio/debug'

const log = debug('example')
log('hello')
log('world')
```
```
2019-07-17T12:37:31.959Z example hello
2019-07-17T12:37:31.962Z example world
```

<details>
<summary>Show Types</summary>

__<a name="type-_debugenv">`_debug.Env`</a>__: An environment.

|       Name       |                                                              Type                                                               |                                                                     Description                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| __init*__        | <em>function(<a href="#type-_debugdebugfunction" title="The setup debug function.">_debug.DebugFunction</a>)</em>               | Env-specific initialization logic for `debug` instances.                                                                                             |
| __log*__         | <em>function(...*)</em>                                                                                                         | The logging function.                                                                                                                                |
| __formatArgs*__  | <em>function(this: <a href="#type-_debugdebugfunction" title="The setup debug function.">_debug.DebugFunction</a>, !Array)</em> | Apply env-specific formatting (colors, etc.).                                                                                                        |
| __save*__        | <em>!Function</em>                                                                                                              | Save `namespaces`.                                                                                                                                   |
| __load*__        | <em>!Function</em>                                                                                                              | Load `namespaces`.                                                                                                                                   |
| __formatters*__  | <em>Object&lt;string, function(!Object): string&gt;</em>                                                                        | Map of special "%n" handling functions, for the debug "format" argument. Valid key names are a single, lower or upper-case letter, i.e. "n" and "N". |
| __useColors*__   | <em>!Function</em>                                                                                                              | Is stdout a TTY? Colored output is enabled when `true`.                                                                                              |
| __colors*__      | <em>!Array&lt;number&gt;</em>                                                                                                   | The array of supported colors.                                                                                                                       |
| __inspectOpts*__ | <em>!Object&lt;string, *&gt;</em>                                                                                               | The options from the env variables, e.g., `DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js`.                                 |

__<a name="type-_debugdebugcontext">`_debug.DebugContext`</a>__

|      Name      |                                                                                                                  Type                                                                                                                   |                                  Description                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| __namespace*__ | <em>string</em>                                                                                                                                                                                                                         | The namespace for which the debug function was setup.                          |
| __enabled*__   | <em>boolean</em>                                                                                                                                                                                                                        | Whether the debug function is enabled.                                         |
| __useColors*__ | <em>boolean</em>                                                                                                                                                                                                                        | If the environment uses colors.                                                |
| __diff*__      | <em>number</em>                                                                                                                                                                                                                         | The diff between the prev time and current time.                               |
| __prev*__      | <em>number</em>                                                                                                                                                                                                                         | The previous time.                                                             |
| __curr*__      | <em>number</em>                                                                                                                                                                                                                         | The current time.                                                              |
| log            | <em>function(...*)</em>                                                                                                                                                                                                                 | The manually set logging function that overrides the environment log function. |
| __color*__     | <em>(number \| string)</em>                                                                                                                                                                                                             | The color for the namespace.                                                   |
| __destroy*__   | <em>function(this: <a href="#type-_debugdebugfunction" title="The setup debug function.">_debug.DebugFunction</a>): boolean</em>                                                                                                        | Removes the debug function from the namespace.                                 |
| __extend*__    | <em>function(this: <a href="#type-_debugdebugfunction" title="The setup debug function.">_debug.DebugFunction</a>, string, string): <a href="#type-_debugdebugfunction" title="The setup debug function.">_debug.DebugFunction</a></em> | Using the debug function, creates a new one.                                   |

`function(this:_debug.DebugContext, ...*)` __<a name="type-_debugdebugfunction">`_debug.DebugFunction`</a>__: The setup debug function.
</details>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Modifiers

The modifiers can be used to print information in formatted way.

| Modifier |                 Action                 |
| -------- | -------------------------------------- |
| %O       | Multiline inspect.                     |
| %o       | Single line inspect.                   |
| %f       | File-size format of bytes, e.g., 10MB. |
| %fy      | File-size in yellow.                   |
| %fr      | File-size in red.                      |
| %fb      | File-size in blue.                     |
| %fg      | File-size in grey.                     |
| %fc      | File-size in cyan                      |
| %fm      | File-size in magenta.                  |

```js
import Debug from '@idio/debug'

const debug = Debug('example')
debug('hello %O', { test: 'ok' })
debug('world %f', 105248)
```
```
2019-07-17T12:40:10.831Z example hello { test: 'ok' }
2019-07-17T12:40:10.859Z example world 102.78KB
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

Original Authors:

- TJ Holowaychuk
- Nathan Rajlich
- Andrew Rhyne

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>