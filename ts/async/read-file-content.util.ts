import type { AppExceptionResult } from '../app-exception-result.js'
import { GET_EXCEPTION_RESULT_OF } from './get-exception-result-of.util.js'

/** Takes a `Blob` or `File` and returns its content as a `string`. OK for small files */
export const READ_FILE_CONTENT = async (file: Blob | File): Promise<AppExceptionResult> => {
  const reader = new FileReader()

  // eslint-disable-next-line max-params
  const res = await GET_EXCEPTION_RESULT_OF(new Promise((resolve, reject) => {
    reader.onload = event => { resolve(event.target?.result) }

    reader.onerror = (err: any) => {
      const error: Error = err
      reject(error)
    }

    reader.readAsText(file)
  }))

  return res
}
