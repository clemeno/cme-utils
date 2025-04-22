import { IS_A_MAP, IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC, IS_ON } from './check/check.util.js'
import { TO_ANY_ARRAY, TO_NUMBER } from './convert/convert.util.js'
import { TO_STRING } from './convert/to-string.util.js'
import { type numeric } from './numeric.js'
import { GET_OBJECT_ENTRY_LIST } from './object.util.js'

export const NORMALIZE_N_1 = (_: { n?: numeric, min?: numeric, max?: numeric, def?: numeric }): string => {
  const n = TO_NUMBER(_.n ?? 1)
  const min = TO_NUMBER(_.min ?? 1)
  const max = TO_NUMBER(_.max ?? 1)
  const def = TO_STRING(_.def ?? 1)
  return IS_NUMERIC(n) ? TO_STRING(Math.max(min, Math.min(n, max))) : def
}

export const NORMALIZE_PER_PAGE = (perPage: numeric): string => NORMALIZE_N_1({ n: perPage, max: Number.MAX_SAFE_INTEGER })

export const NORMALIZE_PAGES = (_: { normalizedPerPage: numeric, filteredCount: numeric }): string => {
  return TO_STRING(Math.ceil(TO_NUMBER(_.filteredCount ?? 1) / TO_NUMBER(_.normalizedPerPage ?? 1)))
}

export const NORMALIZE_PAGE = (_: { page: numeric, normalizedPages: numeric }): string => {
  return NORMALIZE_N_1({ n: _.page, max: _.normalizedPages })
}

export const NORMALIZE_OFFSET = (_: { normalizedPage: numeric, normalizedPerPage: numeric }): string => {
  return TO_STRING((TO_NUMBER(_.normalizedPage) - 1) * TO_NUMBER(_.normalizedPerPage))
}

export const NORMALIZE_LIMIT = (normalizedPerPage: numeric): string => TO_STRING(normalizedPerPage)

export const NORMALIZE_PAGINATION = (_: {
  page: numeric
  perPage: numeric
  filteredCount: numeric
}): {
  normalizedPage: string
  normalizedPerPage: string
  normalizedPages: string
  normalizedOffset: string
  normalizedLimit: string
} => {
  const { page, perPage, filteredCount } = _
  const normalizedPerPage = NORMALIZE_PER_PAGE(perPage)
  const normalizedPages = NORMALIZE_PAGES({ normalizedPerPage, filteredCount })
  const normalizedPage = NORMALIZE_PAGE({ page, normalizedPages })
  const normalizedOffset = NORMALIZE_OFFSET({ normalizedPage, normalizedPerPage })
  const normalizedLimit = NORMALIZE_LIMIT(normalizedPerPage)
  return { normalizedPage, normalizedPerPage, normalizedPages, normalizedOffset, normalizedLimit }
}

export const SELECT_COLUMNS = (aliasColumns: Record<string, string[]>): string[] => {
  const select: string[] = []

  for (const [alias, columns] of GET_OBJECT_ENTRY_LIST(aliasColumns)) {
    for (const column of columns) {
      select.push(`${alias}.${column}`)
    }
  }

  return select
}

export const SELECT_COLUMNS_IN_ORDER = (_: { aliasColumns: Record<string, string[]>, order: string[] }): any => {
  const aliasColumnsEntryList = GET_OBJECT_ENTRY_LIST(_.aliasColumns)

  const select: string[] = []

  for (const column of _.order) {
    const alias = TO_STRING(TO_ANY_ARRAY(aliasColumnsEntryList.find(([, columns]) => columns.includes(column)))[0])

    if (IS_A_STRING_AND_NOT_EMPTY(alias)) {
      select.push(`${alias}.${column}`)
    }
  }

  return select
}

export const LIKE_KEEP_PERCENT_AND_DASH = (_: { from: string, escapeWith?: string }): string => {
  const esc = _.escapeWith ?? '\\'

  return `${_.from}`.split(esc).join(`${esc}${esc}`).replace(/%/g, `${esc}%`).replace(/_/g, `${esc}_`)
}

export interface WHERE_PARAMS {
  qb: any
  column: any
  operator?: string
  value: any
  bKeepPercentAndDash?: boolean
  bBeginsWith?: boolean
  bEndsWith?: boolean
}

export const WHERE = (_: WHERE_PARAMS): void => {
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

export const OR_WHERE = (_: WHERE_PARAMS): void => {
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

export interface WHERE_IN_PARAMS {
  qb: any
  column: any
  values: any[] | Set<any> | Map<any, any> | readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any>
}

export const WHERE_IN = (_: WHERE_IN_PARAMS): void => {
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

export const WHERE_NOT_IN = (_: WHERE_IN_PARAMS): void => {
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
    for (const v of _.values) {
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

export interface OR_WHERE_IN_PARAMS {
  qb: any
  column: any
  values: any[]
}

export const OR_WHERE_IN = (_: OR_WHERE_IN_PARAMS): void => {
  for (const v of _.values) {
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

export const OR_WHERE_NOT_IN = (_: OR_WHERE_IN_PARAMS): void => {
  _.qb.orWhere((qb: any) => {
    for (const v of _.values) {
      const lowercaseV = (typeof v === 'string') ? v.toLowerCase() : v
      if (lowercaseV === '§§not0§§') {
        qb.where(_.column, '=', 0)
      } else if (lowercaseV === '§§null§§') {
        qb.whereNull(_.column)
      } else {
        qb.whereNot(_.column, '=', v)
      }
    }
  })
}

export const AND_WHERE_OR = (_: {
  qb: any
  or: Array<{
    column: string
    operator?: string
    value: any
    bKeepPercentAndDash?: boolean
  }>
}): void => {
  _.qb.where((_qb: any) => {
    for (const _or of _.or) {
      OR_WHERE({ qb: _qb, ..._or })
    }
  })
}

export interface WHERE_NULL_PARAMS {
  qb: any
  column: string
}

export const WHERE_NULL = (_: WHERE_NULL_PARAMS): void => { _.qb.whereNull(_.column) }

export const WHERE_NOT_NULL = (_: WHERE_NULL_PARAMS): void => { _.qb.whereNotNull(_.column) }

export const OR_WHERE_NULL = (_: WHERE_NULL_PARAMS): void => { _.qb.orWhereNull(_.column) }

export const OR_WHERE_NOT_NULL = (_: WHERE_NULL_PARAMS): void => { _.qb.orWhereNotNull(_.column) }
