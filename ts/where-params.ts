export interface WhereParams {
  qb: any
  column: any
  operator?: string
  value: unknown
  bKeepPercentAndDash?: boolean
  bBeginsWith?: boolean
  bEndsWith?: boolean
  bPg?: boolean
}
