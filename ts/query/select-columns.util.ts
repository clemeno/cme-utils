import { GET_OBJECT_ENTRY_LIST } from '../object/get-object-entry-list.util.js'

/**
 * Lists the columns to select, each one prefixed by its table alias (`alias.column`)
 * @param aliasColumns - The columns of each table alias
 * @returns The list of `alias.column` strings, in the order of the aliases then of the columns
 * @example
 * ```typescript
 * SELECT_COLUMNS({ u: ['id', 'name'], p: ['title'] }) // returns ['u.id', 'u.name', 'p.title']
 * SELECT_COLUMNS({ u: [] }) // returns []
 * SELECT_COLUMNS({}) // returns []
 * ```
 */
export function SELECT_COLUMNS (aliasColumns: Record<string, string[]>): string[] {
  const select: string[] = []

  for (const [alias, columns] of GET_OBJECT_ENTRY_LIST(aliasColumns)) {
    for (const column of columns) {
      select.push(`${alias}.${column}`)
    }
  }

  return select
}
