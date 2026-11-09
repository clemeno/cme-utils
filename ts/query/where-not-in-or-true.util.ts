import { IS_EMPTY } from '../check/is-empty.util.js'
import type { WhereInParams } from '../where-in-params.js'
import { WHERE_NOT_IN } from './where-not-in.util.js'

/**
 * WHERE_NOT_IN, but an empty list/set/map adds `1 = 1` like knex `whereNotIn([])`, instead of adding no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to exclude, as an array, a Set or a Map (its values are used); `'§§null§§'` excludes a null column (`is not null`) and `'§§not0§§'` excludes every value but 0 (`= 0`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_NOT_IN_OR_TRUE({ qb, column: 'id', values: [1, 2] }) // adds where id != 1 and id != 2
 * WHERE_NOT_IN_OR_TRUE({ qb, column: 'id', values: [] }) // adds where 1 = 1
 * ```
 */
export function WHERE_NOT_IN_OR_TRUE (_: WhereInParams): void {
  if (IS_EMPTY(_.values)) {
    _.qb.whereRaw('1 = 1')
  } else {
    WHERE_NOT_IN(_)
  }
}
