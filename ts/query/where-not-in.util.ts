import type { WhereInParams } from '../where-in-params.js'
import { WHERE_IN } from './where-in.util.js'

/**
 * Adds a "column differs from every value" condition with AND; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to exclude, as an array, a Set or a Map (its values are used); `'§§null§§'` excludes a null column (`is not null`) and `'§§not0§§'` excludes every value but 0 (`= 0`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_NOT_IN({ qb, column: 'id', values: [1, 2] }) // adds where id != 1 and id != 2
 * WHERE_NOT_IN({ qb, column: 'id', values: ['§§null§§'] }) // adds where id is not null
 * WHERE_NOT_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function WHERE_NOT_IN (_: WhereInParams): void {
  WHERE_IN({ ..._, bOr: false, bNot: true })
}
