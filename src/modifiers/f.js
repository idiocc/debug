import { format } from '../bytes'
import { c } from 'erte'

export default {
  'f': format,
  'fy'(v) {
    return c(format(v), 'yellow')
  },
  'fr'(v) {
    return c(format(v), 'red')
  },
  'fb'(v) {
    return c(format(v), 'blue')
  },
  'fg'(v) {
    return c(format(v), 'green')
  },
  'fc'(v) { return c(format(v), 'cyan') },
  'fm'(v) { return c(format(v), 'magenta') },
}
