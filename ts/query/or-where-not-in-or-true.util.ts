import { IS_EMPTY } from '../check/is-empty.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'
import { OR_WHERE_NOT_IN } from './or-where-not-in.util.js'

/**
 * OR_WHERE_NOT_IN, but an empty list/set/map adds `OR 1 = 1` like knex `orWhereNotIn([])`, instead of adding no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to exclude, as an array, a Set or a Map (its values are used); `'§§null§§'` excludes a null column (`is not null`) and `'§§not0§§'` excludes every value but 0 (`= 0`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_NOT_IN_OR_TRUE({ qb, column: 'id', values: [1, 2] }) // adds or (id != 1 and id != 2)
 * OR_WHERE_NOT_IN_OR_TRUE({ qb, column: 'id', values: [] }) // adds or 1 = 1
 * ```
 */
export function OR_WHERE_NOT_IN_OR_TRUE (_: OrWhereInParams): void {
  if (IS_EMPTY(_.values)) {
    _.qb.orWhereRaw('1 = 1')
  } else {
    OR_WHERE_NOT_IN(_)
  }
}
