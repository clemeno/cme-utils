import type { WhereParams } from '../where-params.js'
import { WHERE } from './where.util.js'

/**
 * Adds one condition to the query builder, with OR: equality (`null` becomes `is null`), a comparison operator, a like pattern (begins with, ends with, contains) or a case-insensitive contains
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
 * OR_WHERE({ qb, column: 'id', value: 5 }) // adds or where id = 5
 * OR_WHERE({ qb, column: 'id', value: null }) // adds or where id is null
 * OR_WHERE({ qb, column: 'name', value: 'ab', bBeginsWith: true }) // adds or where name like 'ab%'
 * OR_WHERE({ qb, column: 'name', value: 'ab', bEndsWith: true }) // adds or where name like '%ab'
 * OR_WHERE({ qb, column: 'name', value: 'ab', operator: 'like' }) // adds or where INSTR(name, 'ab') > 0
 * OR_WHERE({ qb, column: 'age', value: 18, operator: '>=' }) // adds or where age >= 18
 * ```
 */
export function OR_WHERE (_: WhereParams): void {
  WHERE({ ..._, bOr: true })
}
