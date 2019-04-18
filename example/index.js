/* alanode example/ */
import debug from '../src'

(async () => {
  const res = await debug({
    text: 'example',
  })
  console.log(res)
})()