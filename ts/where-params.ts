export interface WhereParams {
  qb: any
  column: string
  operator?: string
  value: unknown
  bKeepPercentAndDash?: boolean
  bBeginsWith?: boolean
  bEndsWith?: boolean
  bPg?: boolean
}
