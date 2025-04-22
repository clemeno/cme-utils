import { IS_SET } from './check/is-set.util.js'

/** Used to model html <option> elements in the app + meta-data */
export class AppOption {
  [ a: string ]: any
  value: any
  label = ''
  key?: string
  bDisabled?: boolean
  bSelected?: boolean
  bHidden?: boolean
  bReadonly?: boolean

  constructor (_?: Partial<AppOption>) {
    if (IS_SET(_)) {
      Object.assign(this, _)
    }
  }
}
