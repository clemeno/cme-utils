import { IS_SET } from '../check/is-set.util.js'

export const ARRAY_MIN_MAX = <T = any> (a: T[]): { min: T | undefined, max: T | undefined } => {
  let min: T | undefined
  let max: T | undefined

  for (const element of a) {
    if (IS_SET(element)) {
      if (!IS_SET(min) || (element < min)) {
        min = element
      }

      if (!IS_SET(max) || (max < element)) {
        max = element
      }
    }
  }

  return { min, max }
}
