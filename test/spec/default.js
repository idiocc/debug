import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import debug from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof debug, 'function')
  },
  async 'calls package without error'() {
    await debug()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await debug({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T