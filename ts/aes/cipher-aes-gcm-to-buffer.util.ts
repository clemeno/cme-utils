import { createCipheriv, randomBytes } from 'node:crypto'

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
