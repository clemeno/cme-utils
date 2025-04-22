import { IS_SET } from './check/is-set.util.js'

/** Used to match the Angular `Sort` interface: `column` <-> `active` ; `order` <-> `direction` */
export class AppSort {
  column = ''
  order?: 'asc' | 'desc' | ''
  bDisabled?: boolean

  constructor (_?: Partial<AppSort>) {
    if (IS_SET(_)) {
      Object.assign(this, _)
    }
  }
}
