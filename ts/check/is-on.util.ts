/**
 * ! internal
 * CHECK (is `falsy`)
 */
function IS_OFF (v: any): boolean {
  return (
    (typeof v === 'undefined') ||
    (v === null) ||
    (v === false) ||
    (v === '') ||
    (v === 0) ||
    ((typeof v === 'number') && isNaN(v))
  )
}

/** CHECK (is `truthy`) */
export function IS_ON<T = any> (v: T | null | undefined | false | '' | 0): v is T {
  return !IS_OFF(v)
}
