import { TO_STRING } from '../convert/to-string.util.js'
import type { compareFnType } from '../compare-fn-type.js'

export async function COMPARE_PASSWORD (_: {
  clear: any
  hash: string
  compareFn: compareFnType
}): Promise<boolean> {
  const res = await _.compareFn(TO_STRING(_.clear), _.hash)
  return res
}
