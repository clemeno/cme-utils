import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * Reads a base64 AES-128-GCM key file and decodes it to a Buffer.
 * The platform APIs are provided by the caller: `import { Buffer } from 'node:buffer'` and `import { createReadStream } from 'node:fs'`.
 * Runs on Node and bun only: it reads a file by its path.
 * @param _ - The parameter object
 * @param _.Buffer - The `Buffer` class, used to decode the base64 content
 * @param _.createReadStream - The `createReadStream` function of `node:fs`
 * @param _.aes128GcmKeyFile - The path of the file holding the base64 key
 * @returns A Buffer of the decoded key (empty for an empty file)
 * @example
 * ```typescript
 * // key.txt holds SGVsbG8gV29ybGQ=
 * await GET_AES_GCM_KEY_BUFFER({ Buffer, createReadStream, aes128GcmKeyFile: 'key.txt' }) // returns Buffer.from('Hello World')
 * // an empty file gives an empty Buffer
 * await GET_AES_GCM_KEY_BUFFER({ Buffer, createReadStream, aes128GcmKeyFile: 'empty.txt' }) // returns Buffer.from('')
 * ```
 */
export async function GET_AES_GCM_KEY_BUFFER<Buffer = any, TypeofBuffer = any, TypeofCreateReadStream = any> (_: {
  Buffer: TypeofBuffer
  createReadStream: TypeofCreateReadStream
  aes128GcmKeyFile: string
}): Promise<Buffer> {
  const fileFullTextContent = await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeyFile, createReadStream: _.createReadStream })

  return (_.Buffer as any).from(fileFullTextContent, 'base64')
}
