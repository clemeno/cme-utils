import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { IS_NULL } from '../check/is-null.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { FROM_JS_TO_SNAKE_CASE } from '../convert/from-js-to-snake-case.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { WhereParams } from '../where-params.js'
import { LIKE_KEEP_PERCENT_AND_DASH } from './like-keep-percent-and-dash.util.js'

/**
 * Adds one condition to the query builder, with AND: equality (`null` becomes `is null`), a comparison operator, a like pattern (begins with, ends with, contains) or a case-insensitive contains
 * @param _ - The query builder and the condition
 * @param _.qb - The knex query builder to add the condition to
 * @param _.column - The column to compare
 * @param _.operator - The comparison operator (e.g. '>', 'like', 'ilike'); when set, the value is compared with it
 * @param _.value - The value to compare with (`null` or the `'§§null§§'` marker matches a null column)
 * @param _.bKeepPercentAndDash - Escape `%` and `_` in the value so that a like only matches them literally
 * @param _.bBeginsWith - Match columns that begin with the value (like `value%`)
 * @param _.bEndsWith - Match columns that end with the value (like `%value`)
 * @param _.bPg - Use PostgreSQL syntax (`ilike`, `POSITION`) instead of MySQL (`like`, `INSTR`)
 * @returns nothing: adds the condition to the query builder
 * @example
 * ```typescript
 * WHERE({ qb, column: 'id', value: 5 }) // adds where id = 5
 * WHERE({ qb, column: 'id', value: null }) // adds where id is null
 * WHERE({ qb, column: 'name', value: 'ab', bBeginsWith: true }) // adds where name like 'ab%'
 * WHERE({ qb, column: 'name', value: 'ab', bEndsWith: true }) // adds where name like '%ab'
 * WHERE({ qb, column: 'name', value: 'ab', operator: 'like' }) // adds where INSTR(name, 'ab') > 0
 * WHERE({ qb, column: 'age', value: 18, operator: '>=' }) // adds where age >= 18
 * ```
 */
export function WHERE (_: WhereParams): void {
  const bBeginsWith = IS_ON(_.bBeginsWith)
  const bEndsWith = IS_ON(_.bEndsWith)

  const bPg = IS_ON(_.bPg)

  if (bBeginsWith || bEndsWith || IS_A_STRING_AND_NOT_EMPTY(_.operator)) {
    const bKeepPercentAndDash = IS_ON(_.bKeepPercentAndDash)

    let pattern = `${bKeepPercentAndDash ? LIKE_KEEP_PERCENT_AND_DASH({ from: _.value as string }) : TO_STRING(_.value)}`

    if (bBeginsWith || bEndsWith || (_.operator === 'ilike')) {
      if (bBeginsWith) {
        pattern = `${pattern}%`
      }

      if (bEndsWith) {
        pattern = `%${pattern}`
      }

      if (!bBeginsWith && !bEndsWith) {
        pattern = `%${pattern}%`
      }

      _.qb.where(_.column, bPg ? 'ilike' : 'like', pattern)
    } else if ((_.operator === 'like') && IS_A_STRING_AND_NOT_EMPTY(_.column)) {
      const rawColumn = FROM_JS_TO_SNAKE_CASE(_.column).replace(/[^a-zA-Z0-9_.]/g, '')

      _.qb.whereRaw(bPg ? `POSITION(? IN ${rawColumn}) > 0` : `INSTR(${rawColumn}, ?) > 0`, [_.value])
    } else {
      _.qb.where(_.column, _.operator, _.value)
    }
  } else if (IS_NULL(_.value) || ((typeof _.value === 'string') && (_.value.toLowerCase() === '§§null§§'))) {
    _.qb.whereNull(_.column)
  } else {
    _.qb.where(_.column, '=', _.value)
  }
}
