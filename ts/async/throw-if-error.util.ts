import { IS_SET } from '../check/is-set.util.js'
import type { AppExceptionResult } from '../app-exception-result.js'

/**
 * From an `ExceptionResult`, `throw` on `exception` or return the `response`.
 * @param request - The promise of an `{ exception, result }` object
 * @returns The response when its `exception` is null or undefined
 * @example
 * ```typescript
 * await THROW_IF_ERROR(Promise.resolve({ exception: undefined, result: 42 })) // returns { exception: undefined, result: 42 }
 * await THROW_IF_ERROR(Promise.resolve({ exception: new Error('boom'), result: undefined })) // throws Error boom
 * ```
 */
export async function THROW_IF_ERROR (request: Promise<AppExceptionResult>): Promise<AppExceptionResult> {
  const response = await request

  if (IS_SET(response.exception)) {
    throw response.exception
  }

  return response
}
