import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * * provide createReadStream -> import { createReadStream } from 'node:fs'
 */
export const GET_AES_GCM_KEY_SFTP_BUFFER = async <TypeofCreateReadStream = any> (_: {
  createReadStream: TypeofCreateReadStream
  aes128GcmKeySftpFile: string
}): Promise<Buffer> => {
  const fileFullTextContent = await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeySftpFile, createReadStream: _.createReadStream })
  return Buffer.from(fileFullTextContent, 'base64')
}
