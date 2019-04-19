import debug from './index_'

const d = debug('t')
const o = {
  test: 1,
  hello: 2,
  'itsme': 'adele',
  somanynewlines: true,
  whencaniseeanewline: 'greedisgood',
}
d('hello %o, %O', o, o)