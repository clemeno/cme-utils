import { AppExceptionOnly } from './app-exception-only.js'
import { IS_SET } from './check/is-set.util.js'

/** expect an { exception, result } */
export class AppExceptionResult<E = any, T = any> extends AppExceptionOnly<E> {
  result: T | undefined

  constructor (_?: Partial<AppExceptionResult<E, T>>) {
    super(_)

    if (IS_SET(_)) {
      Object.assign(this, _)
    }
  }
}
