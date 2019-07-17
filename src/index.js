import NodeEnv from './node'
import setup from './common'

/**
 * Creates a function to log messages.
 * @param {string} namespace
 */
export default function(namespace) {
  const node = setup(NodeEnv)
  const debug = node(namespace)
  return debug
}