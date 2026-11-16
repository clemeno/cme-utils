import { IS_ON } from '../check/is-on.util.js'
import { IS_A_MAP } from '../map/is-a-map.util.js'
import type { WhereInParams } from '../where-in-params.js'

/**
 * Adds the condition of one value, joined with OR or AND: `'§§null§§'` tests a null column, `'§§not0§§'` a column different from 0, any other value equality; bNot negates it
 * @param _ - The query builder, the column, the value and the flags
 * @param _.qb - The knex query builder, or the group, to add the condition to
 * @param _.column - The column to compare
 * @param _.value - The value or marker
 * @param _.bOr - Join the condition with OR instead of AND
 * @param _.bNot - Negate the condition
 * @returns nothing: adds the condition to the query builder
 */
function addValueCondition (_: { qb: any, column: any, value: unknown, bOr: boolean, bNot: boolean }): void {
  const whereMethod = _.bOr ? 'orWhere' : 'where'
  const lowercaseValue = (typeof _.value === 'string') ? _.value.toLowerCase() : _.value

  if (lowercaseValue === '§§not0§§') {
    _.qb[_.bNot ? whereMethod : `${whereMethod}Not`](_.column, '=', 0)
  } else if (lowercaseValue === '§§null§§') {
    _.qb[_.bNot ? `${whereMethod}NotNull` : `${whereMethod}Null`](_.column)
  } else {
    _.qb[_.bNot ? `${whereMethod}Not` : whereMethod](_.column, '=', _.value)
  }
}

/**
 * Adds a "column equals one of the values" condition (with `bNot`: "column differs from every value"), joined with AND (with `bOr`: OR); an empty list adds no condition.
 * IN joins its values with OR and NOT IN with AND; two values or more go in a group only when that inner connector differs from the outer one (AND IN and OR NOT IN group, OR IN and AND NOT IN do not)
 * @param _ - The query builder, the column, the values and the flags
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.values - The values, as an array, a Set or a Map (its values are used); `'§§null§§'` matches a null column and `'§§not0§§'` a column different from 0 (with `bNot`: `is not null` and `= 0`)
 * @param _.bOr - Join the condition with OR instead of AND
 * @param _.bNot - Exclude the values (NOT IN) instead of matching them
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE_IN({ qb, column: 'id', values: [1, 2] }) // adds where (id = 1 or id = 2)
 * WHERE_IN({ qb, column: 'id', values: [1] }) // adds where id = 1
 * WHERE_IN({ qb, column: 'id', values: ['§§null§§', 3] }) // adds where (id is null or id = 3)
 * WHERE_IN({ qb, column: 'id', values: [1, 2], bOr: true }) // adds or id = 1 or id = 2
 * WHERE_IN({ qb, column: 'id', values: [1, 2], bNot: true }) // adds where id != 1 and id != 2
 * WHERE_IN({ qb, column: 'id', values: [1, 2], bOr: true, bNot: true }) // adds or (id != 1 and id != 2)
 * WHERE_IN({ qb, column: 'id', values: [] }) // adds no condition
 * ```
 */
export function WHERE_IN (_: WhereInParams): void {
  const valueList = Array.from(IS_A_MAP(_.values) ? _.values.values() : _.values)
  const bOr = IS_ON(_.bOr)
  const bNot = IS_ON(_.bNot)

  // the inner connector is OR for IN and AND for NOT IN: it differs from the outer one when bOr equals bNot
  if ((valueList.length !== 1) && (bOr === bNot)) {
    _.qb[bOr ? 'orWhere' : 'where']((qb: any) => {
      for (const value of valueList) {
        addValueCondition({ qb, column: _.column, value, bOr: !bNot, bNot })
      }
    })
  } else {
    for (const value of valueList) {
      addValueCondition({ qb: _.qb, column: _.column, value, bOr, bNot })
    }
  }
}
