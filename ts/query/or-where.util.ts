import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { WhereParams } from '../where-params.js'
import { LIKE_KEEP_PERCENT_AND_DASH } from './like-keep-percent-and-dash.util.js'

export const OR_WHERE = (_: WhereParams): void => {
  const bBeginsWith = IS_ON(_.bBeginsWith)
  const bEndsWith = IS_ON(_.bEndsWith)

  if (bBeginsWith || bEndsWith || IS_A_STRING_AND_NOT_EMPTY(_.operator)) {
    if (bBeginsWith || bEndsWith || (_.operator === 'like')) {
      const bKeepPercentAndDash = IS_ON(_.bKeepPercentAndDash)

      let pattern = `${bKeepPercentAndDash ? LIKE_KEEP_PERCENT_AND_DASH({ from: _.value }) : TO_STRING(_.value)}`

      if (bBeginsWith) {
        pattern = `${pattern}%`
      }

      if (bEndsWith) {
        pattern = `%${pattern}`
      }

      if (!bBeginsWith && !bEndsWith) {
        pattern = `%${pattern}%`
      }

      _.qb.orWhere(_.column, _.operator, pattern)
    } else {
      _.qb.orWhere(_.column, _.operator, _.value)
    }
  } else {
    _.qb.orWhere(_.column, '=', _.value)
  }
}
