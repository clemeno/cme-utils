import { IS_SET } from '../check/is-set.util.js'
import type { AppExceptionResult } from '../app-exception-result.js'

/** From an `ExceptionResult`, `throw` on `exception` or return the `response` */
export async function THROW_IF_ERROR (request: Promise<AppExceptionResult>): Promise<AppExceptionResult> {
  const response = await request

  if (IS_SET(response.exception)) {
    throw response.exception
  }

  return response
}
