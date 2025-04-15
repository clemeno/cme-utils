import { TO_STRING } from 'convert/to-string.util'
import dotenv from 'dotenv'
import { GET_FILE_FULL_TEXT_CONTENT } from 'file.util'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

dotenv.config()

const ENV: Record<string, any> = process.env

const ENV_APP_AES_128_GCM_KEY_FILE = TO_STRING(ENV.APP_AES_128_GCM_KEY_FILE)

export const GET_AES_GCM_KEY_BUFFER = async (): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT(ENV_APP_AES_128_GCM_KEY_FILE),
  'base64'
)

const ENV_APP_AES_128_GCM_KEY_SFTP_FILE = TO_STRING(ENV.APP_AES_128_GCM_KEY_SFTP_FILE)

export const GET_AES_GCM_KEY_SFTP_BUFFER = async (): Promise<Buffer> => Buffer.from(
  await GET_FILE_FULL_TEXT_CONTENT(ENV_APP_AES_128_GCM_KEY_SFTP_FILE),
  'base64'
)

export const DECIPHER_AES_GCM_TO_UTF8 = (_: { cipheredBuffer: Buffer, keyBuffer: Buffer }): string => {
  // ? cipheredByteList = [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  const cipheredByteList: number[] = Array.from(_.cipheredBuffer)

  const authTagLength = 16

  // ? iv: Initialization Vector (first 12 bytes)
  // * createDecipheriv
  const decipher = createDecipheriv('aes-128-gcm', _.keyBuffer, Buffer.from(cipheredByteList.slice(0, 12)), { authTagLength })

  // ? tag: Authentication Tag (last 16 bytes)
  // * decipher.setAuthTag
  decipher.setAuthTag(Buffer.from(cipheredByteList.slice(0 - authTagLength)))

  // ? ciphertext: Encrypted Data PAYLOAD (dynamic bytes)
  // * decipher.update
  const deciphered = decipher.update(Buffer.from(cipheredByteList.slice(12, 0 - authTagLength)).toString('hex'), 'hex', 'utf8')

  // * decipher.final
  // ? don't forget to finalize and return the deciphered text concatenated with the final deciphered part
  return `${deciphered}${decipher.final('utf8')}`
}

export const CIPHER_AES_GCM_TO_BUFFER = (_: { plainString: string, keyBuffer: Buffer }): Buffer => {
  // ? iv: Initialization Vector (first 12 bytes)
  const ivBuffer = randomBytes(12)

  // ? tag: Authentication Tag (last 16 bytes)
  // * createCipheriv
  const cipher = createCipheriv('aes-128-gcm', _.keyBuffer, ivBuffer, { authTagLength: 16 })

  // * cipher.update
  const cipheredBuffer = cipher.update(_.plainString, 'utf8')

  // * cipher.final
  const finalCipheredBuffer = cipher.final()

  // ? [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  return Buffer.concat([ivBuffer, cipheredBuffer, finalCipheredBuffer, cipher.getAuthTag()])
}
