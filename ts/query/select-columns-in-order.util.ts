import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { TO_ANY_ARRAY } from '../convert/to-any-array.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { GET_OBJECT_ENTRY_LIST } from '../object/get-object-entry-list.util.js'

/**
 * Lists the columns to select in a given order, each one prefixed by the first table alias that holds it (`alias.column`)
 * @param _ - The columns of each table alias and the order
 * @param _.aliasColumns - The columns of each table alias
 * @param _.order - The column names in the wanted order
 * @returns The list of `alias.column` strings in the order of `order`; a column no alias holds is skipped
 * @example
 * ```typescript
 * SELECT_COLUMNS_IN_ORDER({ aliasColumns: { u: ['id', 'name'], p: ['title'] }, order: ['title', 'id'] }) // returns ['p.title', 'u.id']
 * SELECT_COLUMNS_IN_ORDER({ aliasColumns: { u: ['id'], p: ['id', 'title'] }, order: ['id', 'title'] }) // returns ['u.id', 'p.title']
 * SELECT_COLUMNS_IN_ORDER({ aliasColumns: { u: ['id'] }, order: ['id', 'unknown'] }) // returns ['u.id']
 * SELECT_COLUMNS_IN_ORDER({ aliasColumns: { u: ['id'] }, order: [] }) // returns []
 * ```
 */
export function SELECT_COLUMNS_IN_ORDER (_: { aliasColumns: Record<string, string[]>, order: string[] }): any {
  const aliasColumnsEntryList = GET_OBJECT_ENTRY_LIST(_.aliasColumns)

  const select: string[] = []

  for (const column of _.order) {
    const alias = TO_STRING(TO_ANY_ARRAY(aliasColumnsEntryList.find(([, columns]) => columns.includes(column)))[0])

    if (IS_A_STRING_AND_NOT_EMPTY(alias)) {
      select.push(`${alias}.${column}`)
    }
  }

  return select
}
