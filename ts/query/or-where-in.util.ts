import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'

/**
 * Adds a "column equals one of the values" condition with OR; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * OR_WHERE_IN({ qb, column: 'id', values: [1, 2] }) // adds or id = 1 or id = 2
 * OR_WHERE_IN({ qb, column: 'id', values: ['§§null§§'] }) // adds or id is null
 * OR_WHERE_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function OR_WHERE_IN (_: OrWhereInParams): void {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)

  if (valueList.length === 1) {
    const v = valueList[0]
    const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v

    if (lowercaseV === '§§not0§§') {
      _.qb.orWhereNot(_.column, '=', 0)
    } else if (lowercaseV === '§§null§§') {
      _.qb.orWhereNull(_.column)
    } else {
      _.qb.orWhere(_.column, '=', v)
    }
  } else {
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
}
