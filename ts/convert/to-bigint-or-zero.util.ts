import { TO_BIGINT_OR_NULL } from './to-bigint-or-null.util.js'

export function TO_BIGINT_OR_ZERO (v: any): bigint {
  return TO_BIGINT_OR_NULL(v) ?? 0n
}
