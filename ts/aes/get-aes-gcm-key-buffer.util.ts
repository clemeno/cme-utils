import { GET_FILE_FULL_TEXT_CONTENT } from 'file'

export const GET_AES_GCM_KEY_BUFFER = async (aes128GcmKeyFile: string): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT(aes128GcmKeyFile),
  'base64'
)
