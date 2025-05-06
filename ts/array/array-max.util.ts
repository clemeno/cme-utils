import { IS_SET } from '../check/is-set.util.js'

export const ARRAY_MAX = <T = any> (a: T[] | readonly T[]): T | undefined => {
  let max: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(max) || (max < v)) {
        max = v
      }
    }
  }

  return max
}
