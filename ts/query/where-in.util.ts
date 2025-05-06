import { IS_A_MAP } from 'check/is-a-map.util.js'
import type { WhereInParams } from '../where-in-params.js'

export const WHERE_IN = (_: WhereInParams): void => {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  if (valueList.length === 1) {
    const v = valueList[0]
    const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

    if (lowercaseV === '§§not0§§') {
      _.qb.whereNot(_.column, '=', 0)
    } else if (lowercaseV === '§§null§§') {
      _.qb.whereNull(_.column)
    } else {
      _.qb.where(_.column, '=', v)
    }
  } else {
    _.qb.where((qb: any) => {
      for (const v of valueList) {
        const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

        if (lowercaseV === '§§not0§§') {
          qb.orWhereNot(_.column, '=', 0)
        } else if (lowercaseV === '§§null§§') {
          qb.orWhereNull(_.column)
        } else {
          qb.orWhere(_.column, '=', v)
        }
      }
    })
  }
}
