import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * import { createReadStream } from 'node:fs'
 */
export const GET_AES_GCM_KEY_SFTP_BUFFER = async (_: {
  aes128GcmKeySftpFile: string
  createReadStream: any
}): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeySftpFile, createReadStream: _.createReadStream }),
  'base64'
)
