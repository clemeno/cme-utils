import type { OrWhereInParams } from '../or-where-in-params.js'
import { WHERE_IN } from './where-in.util.js'

/**
 * Adds a "column equals one of the values" condition with OR; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_IN({ qb, column: 'id', values: [1, 2] }) // adds or id = 1 or id = 2
 * OR_WHERE_IN({ qb, column: 'id', values: ['§§null§§'] }) // adds or id is null
 * OR_WHERE_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function OR_WHERE_IN (_: OrWhereInParams): void {
  WHERE_IN({ ..._, bOr: true, bNot: false })
}
