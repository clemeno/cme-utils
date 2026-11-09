import { IS_EMPTY } from '../check/is-empty.util.js'
import type { WhereInParams } from '../where-in-params.js'
import { WHERE_IN } from './where-in.util.js'

/**
 * WHERE_IN, but an empty list/set/map matches no row (`1 = 0`) instead of adding no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_IN_OR_FALSE({ qb, column: 'id', values: [1, 2] }) // adds where (id = 1 or id = 2)
 * WHERE_IN_OR_FALSE({ qb, column: 'id', values: [] }) // adds where 1 = 0
 * ```
 */
export function WHERE_IN_OR_FALSE (_: WhereInParams): void {
  if (IS_EMPTY(_.values)) {
    _.qb.whereRaw('1 = 0')
  } else {
    WHERE_IN(_)
  }
}
