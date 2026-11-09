import { OR_WHERE } from './or-where.util.js'

/**
 * Adds a parenthesized group of OR conditions, joined to the other conditions of the query builder with AND
 * @param _ - The query builder and the conditions
 * @param _.qb - The knex query builder to add the group to
 * @param _.or - The conditions to join with OR, each one with a `column`, a `value`, and an optional `operator` and `bKeepPercentAndDash`, as `OR_WHERE` reads them
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * AND_WHERE_OR({ qb, or: [{ column: 'a', value: 1 }, { column: 'b', operator: '>', value: 2 }] }) // adds where (a = 1 or b > 2)
 * AND_WHERE_OR({ qb, or: [{ column: 'a', value: null }] }) // adds where (a is null)
 * AND_WHERE_OR({ qb, or: [] }) // adds an empty group, which knex ignores
 * ```
 */
export function AND_WHERE_OR (_: {
  qb: any
  or: Array<{
    column: string
    operator?: string
    value: any
    bKeepPercentAndDash?: boolean
  }>
}): void {
  _.qb.where((_qb: any) => {
    for (const _or of _.or) {
      OR_WHERE({ qb: _qb, ..._or })
    }
  })
}
