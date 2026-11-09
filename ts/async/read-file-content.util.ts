import type { AppExceptionResult } from '../app-exception-result.js'
import { GET_EXCEPTION_RESULT_OF } from './get-exception-result-of.util.js'

/**
 * Takes a `Blob` or `File` and returns its content as a `string`. OK for small files.
 * Needs the browser `FileReader`.
 * @param file - The Blob or File to read as text
 * @returns An object `{ exception, result }`: the text in `result`, or the read error in `exception`
 * @example
 * ```typescript
 * await READ_FILE_CONTENT(new Blob(['hello'])) // returns { exception: undefined, result: 'hello' }
 * await READ_FILE_CONTENT(new Blob([])) // returns { exception: undefined, result: '' }
 * ```
 */
export async function READ_FILE_CONTENT (file: Blob | File): Promise<AppExceptionResult> {
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
