# @idio/debug

[![npm version](https://badge.fury.io/js/@idio/debug.svg)](https://npmjs.org/package/@idio/debug)

`@idio/debug` is The Fork Of Debug For Node That Uses Modern JS.

```sh
yarn add -E @idio/debug
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`debug(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
  * [`Config`](#type-config)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import debug from '@idio/debug'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `debug(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

__<a name="type-config">`Config`</a>__: Options for the program.

|   Name    |   Type    |    Description    | Default |
| --------- | --------- | ----------------- | ------- |
| shouldRun | _boolean_ | A boolean option. | `true`  |
| __text*__ | _string_  | A text to return. | -       |

```js
/* alanode example/ */
import debug from '@idio/debug'

(async () => {
  const res = await debug({
    text: 'example',
  })
  console.log(res)
})()
```
```
example
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>