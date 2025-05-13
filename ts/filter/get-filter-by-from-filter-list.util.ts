import { IS_SET } from '../check/is-set.util.js'
import type { AppFilter } from '../app-filter.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { IS_AN_ARRAY } from '../check/is-an-array.util.js'

export const GET_FILTER_BY_FROM_FILTER_LIST = (_: {
  filterList: AppFilter[]
  conceptSet?: Set<string>
}): Record<string, AppFilter[]> => {
  const filterBy: Record<string, AppFilter[]> = {}

  for (const f of _.filterList) {
    if (IS_SET(f.column)) {
      let c = TO_STRING(f.column)

      if (!IS_SET(_.conceptSet)) {
        c = c.replace(/[`"'\-\\/;]+/gi, '')
        filterBy[c] = (filterBy[c] ?? []).concat(IS_AN_ARRAY(f) ? f : [f])
      } else if (_.conceptSet.has(c)) {
        filterBy[c] = (filterBy[c] ?? []).concat(IS_AN_ARRAY(f) ? f : [f])
      }
    }
  }

  return filterBy
}
