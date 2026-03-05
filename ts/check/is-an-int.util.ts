import { TO_BIGINT_OR_NULL } from '../bigint/to-bigint-or-null.util.js'
import type { int } from '../int.js'
import { IS_NULL } from './is-null.util.js'

/** Checks whether the given value is an integer (bigint, integer number, or numeric integer string). */
export function IS_AN_INT (v: unknown): v is int {
  return !IS_NULL(TO_BIGINT_OR_NULL(v))
}
