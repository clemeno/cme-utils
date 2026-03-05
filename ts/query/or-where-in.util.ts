import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'

export function OR_WHERE_IN (_: OrWhereInParams): void {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  for (const v of valueList) {
    const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

    if (lowercaseV === '§§not0§§') {
      _.qb.orWhereNot(_.column, '=', 0)
    } else if (lowercaseV === '§§null§§') {
      _.qb.orWhereNull(_.column)
    } else {
      _.qb.orWhere(_.column, '=', v)
    }
  }
}
