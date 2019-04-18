import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import debug from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults(input) {
    const res = await debug({
      text: input,
    })
    return res
  },
  context: Context,
})