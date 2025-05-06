import { OR_WHERE } from './or-where.util.js'

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
