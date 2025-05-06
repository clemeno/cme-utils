import { IS_AN_ARRAY } from '../check/is-an-array.util.js'

export const TO_ANY_ARRAY = (from: any): any[] => {
  let res: any[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}
