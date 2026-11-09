import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { WhereInParams } from '../where-in-params.js'

/**
 * Adds a "column equals one of the values" condition with AND; an empty list adds no condition
 * @param _ - The query builder, the column and the values
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values to match, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_IN({ qb, column: 'id', values: [1, 2] }) // adds where (id = 1 or id = 2)
 * WHERE_IN({ qb, column: 'id', values: [1] }) // adds where id = 1
 * WHERE_IN({ qb, column: 'id', values: ['§§null§§', 3] }) // adds where (id is null or id = 3)
 * WHERE_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function WHERE_IN (_: WhereInParams): void {
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
