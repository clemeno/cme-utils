import { SORT_OBJECTS } from './sort-objects.util.js'

/**
 * Comparator that sorts objects by their `label` property in ascending order.
 * @param a - The first object, with a `label`
 * @param b - The second object, with a `label`
 * @returns A negative number when `a` sorts first, a positive one when `b` does, 0 when the labels are equal
 * @example
 * ```typescript
 * [{ label: 'b' }, { label: 'a' }].sort(SORT_BY_LABEL) // returns [{ label: 'a' }, { label: 'b' }]
 * SORT_BY_LABEL({ label: 'b' }, { label: 'a' }) // returns 1
 * SORT_BY_LABEL({ label: 'a' }, { label: 'a' }) // returns 0
 * ;[].sort(SORT_BY_LABEL) // returns []
 * ```
 */
export const SORT_BY_LABEL = SORT_OBJECTS({ on: x => x.label, order: 'asc' })
