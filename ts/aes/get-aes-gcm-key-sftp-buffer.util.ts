import { GET_FILE_FULL_TEXT_CONTENT } from '../file/get-file-full-text-content.util.js'

export const GET_AES_GCM_KEY_SFTP_BUFFER = async (aes128GcmKeySftpFile: string): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT(aes128GcmKeySftpFile),
  'base64'
)
