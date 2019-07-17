import NodeEnv from './node'
import setup from './common'

/**
 * Creates a function to log messages.
 * @param {string} namespace
 */
export default function(namespace) {
  if (!namespace) throw new Error('To use debug, pass the namespace.')
  const node = setup(NodeEnv)
  const debug = node(namespace)
  return debug
}