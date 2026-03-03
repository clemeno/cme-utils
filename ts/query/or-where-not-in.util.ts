import { IS_A_MAP } from '../check/is-a-map.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'

export function OR_WHERE_NOT_IN (_: OrWhereInParams): void {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  _.qb.orWhere((qb: any) => {
    for (const v of valueList) {
      const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

      if (lowercaseV === '§§not0§§') {
        qb.where(_.column, '=', 0)
      } else if (lowercaseV === '§§null§§') {
        qb.whereNull(_.column)
      } else {
        qb.whereNot(_.column, '=', v)
      }
    }
  })
}
