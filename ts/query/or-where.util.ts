import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { FROM_JS_TO_SNAKE_CASE } from '../convert/from-js-to-snake-case.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { WhereParams } from '../where-params.js'
import { LIKE_KEEP_PERCENT_AND_DASH } from './like-keep-percent-and-dash.util.js'

export const OR_WHERE = (_: WhereParams): void => {
  const bBeginsWith = IS_ON(_.bBeginsWith)
  const bEndsWith = IS_ON(_.bEndsWith)
  const bPg = IS_ON(_.bPg)

  if (bBeginsWith || bEndsWith || IS_A_STRING_AND_NOT_EMPTY(_.operator)) {
    const bKeepPercentAndDash = IS_ON(_.bKeepPercentAndDash)
    let pattern = `${bKeepPercentAndDash ? LIKE_KEEP_PERCENT_AND_DASH({ from: _.value }) : TO_STRING(_.value)}`

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

      _.qb.orWhere(_.column, bPg ? 'ilike' : 'like', pattern)
    } else if ((_.operator === 'like') && IS_A_STRING_AND_NOT_EMPTY(_.column)) {
      const rawColumn = FROM_JS_TO_SNAKE_CASE(_.column).replace(/[^a-zA-Z0-9_.]/g, '')

      _.qb.orWhereRaw(bPg ? `POSITION(? IN ${rawColumn}) > 0` : `INSTR(${rawColumn}, ?) > 0`, [_.value])
    } else {
      _.qb.orWhere(_.column, _.operator, _.value)
    }
  } else {
    _.qb.orWhere(_.column, '=', _.value)
  }
}
