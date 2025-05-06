import type { WhereNullParams } from '../where-null-params.js'

export const WHERE_NOT_NULL = (_: WhereNullParams): void => { _.qb.whereNotNull(_.column) }
