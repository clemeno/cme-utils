import { IS_SET } from '../check/is-set.util.js'
import type { AppFilter } from '../app-filter.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { IS_AN_ARRAY } from '../array/is-an-array.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'

export function GET_FILTER_BY_FROM_FILTER_LIST (_: {
  filterList: AppFilter[]
  conceptSet?: Set<string>
}): Record<string, AppFilter[]> {
  const filterBy: Record<string, AppFilter[]> = {}

  for (const f of _.filterList) {
    // AppFilter defaults column to '': a filter without a column (or with nothing left after sanitizing) is skipped
    const c = IS_SET(_.conceptSet) ? TO_STRING(f.column) : TO_STRING(f.column).replace(/[`"'\-\\/;]+/gi, '')

    if (IS_A_STRING_AND_NOT_EMPTY(c) && (!IS_SET(_.conceptSet) || _.conceptSet.has(c))) {
      filterBy[c] = (filterBy[c] ?? []).concat(IS_AN_ARRAY(f) ? f : [f])
    }
  }

  return filterBy
}
