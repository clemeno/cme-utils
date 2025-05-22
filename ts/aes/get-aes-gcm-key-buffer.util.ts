import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * import { createReadStream } from 'node:fs'
 */
export const GET_AES_GCM_KEY_BUFFER = async (_: {
  aes128GcmKeyFile: string
  createReadStream: any
}): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeyFile, createReadStream: _.createReadStream }),
  'base64'
)
