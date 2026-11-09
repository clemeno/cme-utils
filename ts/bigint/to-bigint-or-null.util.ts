import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_A_BIGINT } from '../check/is-a-bigint.util.js'

export function TO_BIGINT_OR_NULL (v: any): bigint | null {
  let res: bigint | null = null

  if (IS_A_BIGINT(v)) {
    res = v
  } else if ((typeof v === 'string') ? (v.trim() !== '') : IS_NUMERIC(v)) {
    // a non-blank string goes to BigInt's own exact parser, which takes '0xff' and rejects '1.5'
    try { res = BigInt(v) } catch { }
  }

  return res
}
