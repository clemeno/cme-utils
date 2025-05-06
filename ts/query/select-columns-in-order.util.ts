import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { TO_ANY_ARRAY } from '../convert/to-any-array.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { GET_OBJECT_ENTRY_LIST } from '../object/get-object-entry-list.util.js'

export const SELECT_COLUMNS_IN_ORDER = (_: { aliasColumns: Record<string, string[]>, order: string[] }): any => {
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
