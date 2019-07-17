import Debug from '../src'

const debug = Debug('example')
debug('hello %O', { test: 'ok' })
debug('world %f', 105248)