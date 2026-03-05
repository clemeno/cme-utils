import { IS_SET } from './check/is-set.util.js'

export interface AppOptionLike<T = string> {
  [ a: string ]: any
  value: T
  label: string
  key?: string
  bDisabled?: boolean
  bSelected?: boolean
  bHidden?: boolean
  bReadonly?: boolean
}

/** Used to model html <option> elements in the app + meta-data */
export class AppOption<T = string> implements AppOptionLike<T> {
  [ a: string ]: any
  value: T = '' as any
  label = ''
  key?: string
  bDisabled?: boolean
  bSelected?: boolean
  bHidden?: boolean
  bReadonly?: boolean

  constructor (_?: Partial<AppOption<T>>) {
    if (IS_SET(_)) {
      Object.assign(this, _)
    }
  }
}
