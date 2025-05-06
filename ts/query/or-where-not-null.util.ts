import type { WhereNullParams } from '../where-null-params.js'

export const OR_WHERE_NOT_NULL = (_: WhereNullParams): void => { _.qb.orWhereNotNull(_.column) }
