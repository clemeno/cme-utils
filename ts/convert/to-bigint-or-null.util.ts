import { IS_NUMERIC } from 'check/is-numeric.util.js'
import { IS_A_BIGINT } from '../check/is-a-bigint.util.js'

export function TO_BIGINT_OR_NULL (v: any): bigint | null {
  let res: bigint | null = null

  if (IS_A_BIGINT(v)) {
    res = v
  } else if (IS_NUMERIC(v)) {
    try { res = BigInt(v) } catch { }
  }

  return res
}
