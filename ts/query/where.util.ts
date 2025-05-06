import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { LIKE_KEEP_PERCENT_AND_DASH } from './like-keep-percent-and-dash.util.js'
import type { WhereParams } from '../where-params.js'

export const WHERE = (_: WhereParams): void => {
  const bStartsWith = IS_ON(_.bBeginsWith)
  const bEndsWith = IS_ON(_.bEndsWith)

  if (bStartsWith || bEndsWith || IS_A_STRING_AND_NOT_EMPTY(_.operator)) {
    if (bStartsWith || bEndsWith || (_.operator === 'like')) {
      const bKeepPercentAndDash = IS_ON(_.bKeepPercentAndDash)

      let pattern = `${bKeepPercentAndDash ? LIKE_KEEP_PERCENT_AND_DASH({ from: _.value }) : TO_STRING(_.value)}`

      const bBeginsWith = IS_ON(_.bBeginsWith)

      if (bBeginsWith) {
        pattern = `${pattern}%`
      }

      const bEndsWith = IS_ON(_.bEndsWith)

      if (bEndsWith) {
        pattern = `%${pattern}`
      }

      if (!bBeginsWith && !bEndsWith) {
        pattern = `%${pattern}%`
      }

      _.qb.where(_.column, _.operator, pattern)
    } else {
      _.qb.where(_.column, _.operator, _.value)
    }
  } else {
    _.qb.where(_.column, '=', _.value)
  }
}
