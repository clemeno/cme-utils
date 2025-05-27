import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

/**
 * * provide createReadStream -> import { createReadStream } from 'node:fs'
 */
export const GET_AES_GCM_KEY_BUFFER = async <TypeofBuffer = any, TypeofCreateReadStream = any> (_: {
  Buffer: TypeofBuffer
  createReadStream: TypeofCreateReadStream
  aes128GcmKeyFile: string
}): Promise<TypeofBuffer> => {
  const fileFullTextContent = await GET_FILE_FULL_TEXT_CONTENT({ filePath: _.aes128GcmKeyFile, createReadStream: _.createReadStream })

  return (_.Buffer as any).from(fileFullTextContent, 'base64')
}
