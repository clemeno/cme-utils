import type { AppExceptionOnly } from '../app-exception-only.js'

/** Takes a promise and returns an object containing an exception if any was thrown during the `Promise` execution. */
export async function GET_EXCEPTION_ONLY (p: Promise<any>): Promise<AppExceptionOnly> {
  const exception = await p
    .then(() => undefined)
    .catch(err => {
      // if (IS_SET(errorExt)) {
      //   Object.assign(err, errorExt)
      // }

      return err
    })

  return { exception }
}
