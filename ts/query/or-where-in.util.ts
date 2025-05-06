import type { OrWhereInParams } from '../or-where-in-params.js'

export const OR_WHERE_IN = (_: OrWhereInParams): void => {
  for (const v of _.values) {
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
