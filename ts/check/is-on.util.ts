/**
 * ! internal
 * CHECK (is `falsy`)
 */
const IS_OFF = (v: any): boolean => (
  (typeof v === 'undefined') ||
  (v === null) ||
  (v === false) ||
  (v === '') ||
  (v === 0) ||
  ((typeof v === 'number') && isNaN(v))
)

/** CHECK (is `truthy`) */
export const IS_ON = <T = any> (v: T | null | undefined | false | '' | 0): v is T => !IS_OFF(v)
