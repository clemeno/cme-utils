import { IS_A_MAP } from '../check/is-a-map.util.js'
import type { WhereInParams } from '../where-in-params.js'

export const WHERE_NOT_IN = (_: WhereInParams): void => {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  if (valueList.length === 1) {
    const v = valueList[0]
    const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v
    if (lowercaseV === '§§not0§§') {
      _.qb.where(_.column, '=', 0)
    } else if (lowercaseV === '§§null§§') {
      _.qb.whereNotNull(_.column)
    } else {
      _.qb.whereNot(_.column, '=', v)
    }
  } else {
    for (const v of _.values) {
      const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v
      if (lowercaseV === '§§not0§§') {
        _.qb.where(_.column, '=', 0)
      } else if (lowercaseV === '§§null§§') {
        _.qb.whereNotNull(_.column)
      } else {
        _.qb.whereNot(_.column, '=', v)
      }
    }
  }
}
