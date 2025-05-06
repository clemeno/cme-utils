import { GET_OBJECT_ENTRY_LIST } from '../object/get-object-entry-list.util.js'

export const SELECT_COLUMNS = (aliasColumns: Record<string, string[]>): string[] => {
  const select: string[] = []

  for (const [alias, columns] of GET_OBJECT_ENTRY_LIST(aliasColumns)) {
    for (const column of columns) {
      select.push(`${alias}.${column}`)
    }
  }

  return select
}
