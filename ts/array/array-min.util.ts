import { IS_SET } from '../check/is-set.util.js'

export const ARRAY_MIN = <T = any> (a: T[]): T | undefined => {
  let min: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(min) || (min > v)) {
        min = v
      }
    }
  }

  return min
}
