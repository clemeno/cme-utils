import type { OrWhereInParams } from '../or-where-in-params.js'

export const OR_WHERE_NOT_IN = (_: OrWhereInParams): void => {
  _.qb.orWhere((qb: any) => {
    for (const v of _.values) {
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
