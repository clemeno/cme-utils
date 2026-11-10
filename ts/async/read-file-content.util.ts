import type { AppExceptionResult } from '../app-exception-result.js'
import { GET_EXCEPTION_RESULT_OF } from './get-exception-result-of.util.js'

// a byte order mark wins over the charset of the type, as in FileReader.readAsText
const BOM_ENCODING_LIST = [
  { bom: [0xef, 0xbb, 0xbf], encoding: 'utf-8' },
  { bom: [0xfe, 0xff], encoding: 'utf-16be' },
  { bom: [0xff, 0xfe], encoding: 'utf-16le' },
]

/** Decodes the bytes as FileReader.readAsText does: by the byte order mark, else the charset of the type, else UTF-8 */
async function readAsText (file: Blob): Promise<string> {
  const byteList = new Uint8Array(await file.arrayBuffer())
  const bomEncoding = BOM_ENCODING_LIST.find(({ bom }) => byteList.slice(0, bom.length).join(',') === bom.join(','))?.encoding
  const encoding = bomEncoding ?? /charset="?([^";\s]+)/i.exec(file.type)?.[1] ?? 'utf-8'

  let decoder = new TextDecoder()
  // an unknown charset falls back to UTF-8, as in FileReader
  try { decoder = new TextDecoder(encoding) } catch { }

  return decoder.decode(byteList)
}

/**
 * Takes a `Blob` or `File` and returns its content as a `string`, decoded as `FileReader.readAsText` does (byte order mark, else the charset of the type, else UTF-8). OK for small files.
 * @param file - The Blob or File to read as text
 * @returns An object `{ exception, result }`: the text in `result`, or the read error in `exception`
 * @example
 * ```typescript
 * await READ_FILE_CONTENT(new Blob(['hello'])) // returns { exception: undefined, result: 'hello' }
 * await READ_FILE_CONTENT(new Blob([])) // returns { exception: undefined, result: '' }
 * await READ_FILE_CONTENT(new Blob([new Uint8Array([0xff, 0xfe, 0x68, 0, 0x69, 0])])) // returns { exception: undefined, result: 'hi' }
 * ```
 */
export async function READ_FILE_CONTENT (file: Blob | File): Promise<AppExceptionResult> {
  // FileReader exists in browsers only: the Blob methods run in browsers, on Node and on bun
  return await GET_EXCEPTION_RESULT_OF(readAsText(file))
}
