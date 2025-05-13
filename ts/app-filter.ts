export class AppFilter {
  column = ''
  operator = ''
  value?: any
  options?: {
    bDbSideToHex?: 0
    bDbSideToUpper?: 0
    bCsnDecLast8Bytes?: 0
    bCsnHexLast8Bytes?: 0
    bEnforceIntlPhone?: 0
  }

  constructor (_: Partial<AppFilter>) {
    Object.assign(this, _)
  }
}
