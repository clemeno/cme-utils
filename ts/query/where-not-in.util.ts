import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { WhereInParams } from '../where-in-params.js'

/**
 * Adds a "column differs from every value" condition with AND; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_NOT_IN({ qb, column: 'id', values: [1, 2] }) // adds where id != 1 and id != 2
 * WHERE_NOT_IN({ qb, column: 'id', values: ['§§null§§'] }) // adds where id is not null
 * WHERE_NOT_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function WHERE_NOT_IN (_: WhereInParams): void {
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
    for (const v of valueList) {
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
