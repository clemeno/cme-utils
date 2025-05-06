import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

export const NORMALIZE_N_1 = (_: { n?: numeric, min?: numeric, max?: numeric, def?: numeric }): string => {
  const n = TO_NUMBER(_.n ?? 1)
  const min = TO_NUMBER(_.min ?? 1)
  const max = TO_NUMBER(_.max ?? 1)
  const def = TO_STRING(_.def ?? 1)

  return IS_NUMERIC(n) ? TO_STRING(Math.max(min, Math.min(n, max))) : def
}
