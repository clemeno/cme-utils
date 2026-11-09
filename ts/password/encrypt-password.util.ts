import { TO_STRING } from '../convert/to-string.util.js'
import type { hashFnType } from '../hash-fn-type.js'

export async function ENCRYPT_PASSWORD (_: {
  clear: any
  hashFn: hashFnType
  iterations?: number
}): Promise<string> {
  const res = await _.hashFn(TO_STRING(_.clear), _.iterations ?? 12)
  return res
}
