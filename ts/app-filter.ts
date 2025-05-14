export class AppFilter {
  column = ''
  operator = ''
  value?: any
  options?: {
    bDbSideToHex?: 0 | 1
    bDbSideToUpper?: 0 | 1
    bCsnDecLast8Bytes?: 0 | 1
    bCsnHexLast8Bytes?: 0 | 1
    bEnforceIntlPhone?: 0 | 1
  }

  constructor (_: Partial<AppFilter>) {
    Object.assign(this, _)
  }
}
