import { IS_SET } from './check/is-set.util.js'

/** expect an { exception } */
export class AppExceptionOnly<E = any> {
  exception: E | undefined

  constructor (_?: Partial<AppExceptionOnly<E>>) {
    if (IS_SET(_)) {
      Object.assign(this, _)
    }
  }
}
