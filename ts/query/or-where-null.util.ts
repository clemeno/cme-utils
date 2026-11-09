import type { WhereNullParams } from '../where-null-params.js'

/**
 * Adds a "column is null" condition with OR
 * @param _ - The query builder and the column
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to test
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_NULL({ qb, column: 'deleted_at' }) // adds or deleted_at is null
 * ```
 */
export function OR_WHERE_NULL (_: WhereNullParams): void {
  _.qb.orWhereNull(_.column)
}
