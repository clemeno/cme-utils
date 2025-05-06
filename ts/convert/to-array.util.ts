import { IS_AN_ARRAY } from '../check/is-an-array.util.js'

export function TO_ARRAY<T> (from: any): T[] {
  let res: T[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}
