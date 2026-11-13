import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * Reads a base64 AES-128-GCM SFTP key file and decodes it to a Buffer.
 * The platform APIs are provided by the caller: `import { Buffer } from 'node:buffer'` and `import { createReadStream } from 'node:fs'`.
 * In a browser, pass a `Buffer` polyfill (the `buffer` package) and a `fetch` based `createReadStream` (see `GET_FILE_FULL_TEXT_CONTENT`).
 * @param _ - The parameter object
 * @param _.Buffer - The `Buffer` class, used to decode the base64 content
 * @param _.createReadStream - The `createReadStream` function of `node:fs`, or a `fetch` based one
 * @param _.aes128GcmKeySftpFile - The path or URL of the file holding the base64 SFTP key
 * @returns A Buffer of the decoded key (empty for an empty file)
 * @example
 * ```typescript
 * // sftp-key.txt holds U0ZUUCBLZXkgUGFydCAy
 * await GET_AES_GCM_KEY_SFTP_BUFFER({ Buffer, createReadStream, aes128GcmKeySftpFile: 'sftp-key.txt' }) // returns Buffer.from('SFTP Key Part 2')
 * // an empty file gives an empty Buffer
 * await GET_AES_GCM_KEY_SFTP_BUFFER({ Buffer, createReadStream, aes128GcmKeySftpFile: 'empty.txt' }) // returns Buffer.from('')
 * ```
 */
export async function GET_AES_GCM_KEY_SFTP_BUFFER<Buffer = any, TypeofBuffer = any, TypeofCreateReadStream = any> (_: {
  Buffer: TypeofBuffer
  createReadStream: TypeofCreateReadStream
  aes128GcmKeySftpFile: string
}): Promise<Buffer> {
  const fileFullTextContent = await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeySftpFile, createReadStream: _.createReadStream })

  return (_.Buffer as any).from(fileFullTextContent, 'base64')
}
