import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'

/**
 * Adds a "column differs from every value" condition with OR; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to exclude, as an array, a Set or a Map (its values are used); `'§§null§§'` excludes a null column (`is not null`) and `'§§not0§§'` excludes every value but 0 (`= 0`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [1, 2] }) // adds or (id != 1 and id != 2)
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [1] }) // adds or id != 1
 * OR_WHERE_NOT_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function OR_WHERE_NOT_IN (_: OrWhereInParams): void {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  if (valueList.length === 1) {
    const v = valueList[0]
    const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

    if (lowercaseV === '§§not0§§') {
      _.qb.orWhere(_.column, '=', 0)
    } else if (lowercaseV === '§§null§§') {
      _.qb.orWhereNotNull(_.column)
    } else {
      _.qb.orWhereNot(_.column, '=', v)
    }
  } else {
    _.qb.orWhere((qb: any) => {
      for (const v of valueList) {
        const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

        if (lowercaseV === '§§not0§§') {
          qb.where(_.column, '=', 0)
        } else if (lowercaseV === '§§null§§') {
          qb.whereNotNull(_.column)
        } else {
          qb.whereNot(_.column, '=', v)
        }
      }
    })
  }
}
