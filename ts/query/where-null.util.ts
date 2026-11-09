import type { WhereNullParams } from '../where-null-params.js'

/**
 * Adds a "column is null" condition with AND
 * @param _ - The query builder and the column
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to test
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_NULL({ qb, column: 'deleted_at' }) // adds where deleted_at is null
 * ```
 */
export function WHERE_NULL (_: WhereNullParams): void {
  _.qb.whereNull(_.column)
}
