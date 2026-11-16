import type { OrWhereInParams } from '../or-where-in-params.js'
import { WHERE_IN } from './where-in.util.js'

/**
 * Adds a "column differs from every value" condition with OR; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to exclude, as an array, a Set or a Map (its values are used); `'§§null§§'` excludes a null column (`is not null`) and `'§§not0§§'` excludes every value but 0 (`= 0`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [1, 2] }) // adds or (id != 1 and id != 2)
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [1] }) // adds or id != 1
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function OR_WHERE_NOT_IN (_: OrWhereInParams): void {
  WHERE_IN({ ..._, bOr: true, bNot: true })
}
