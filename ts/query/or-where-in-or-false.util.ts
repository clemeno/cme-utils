import { IS_EMPTY } from '../check/is-empty.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'
import { OR_WHERE_IN } from './or-where-in.util.js'

/**
 * OR_WHERE_IN, but an empty list/set/map adds `OR 1 = 0` instead of adding no condition
 * @param inParams - The query builder, the column and the values
 * @param inParams.qb - The knex query builder to add the condition to
 * @param inParams.column - The column to compare
 * @param inParams.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_IN_OR_FALSE({ qb, column: 'id', values: [1, 2] }) // adds or id = 1 or id = 2
 * OR_WHERE_IN_OR_FALSE({ qb, column: 'id', values: [] }) // adds or 1 = 0
 * ```
 */
export function OR_WHERE_IN_OR_FALSE (inParams: OrWhereInParams): void {
  if (IS_EMPTY(inParams.values)) {
    inParams.qb.orWhereRaw('1 = 0')
  } else {
    OR_WHERE_IN(inParams)
  }
}
