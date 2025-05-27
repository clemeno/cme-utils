/**
 * * provide createCipheriv and randomBytes -> import { createCipheriv, randomBytes } from 'node:crypto'
 */
export const CIPHER_AES_GCM_TO_BUFFER = <TypeofBuffer = any, TypeofCreateCipheriv = any, TypeofRandomBytes = any> (_: {
  Buffer: TypeofBuffer
  createCipheriv: TypeofCreateCipheriv
  randomBytes: TypeofRandomBytes
  plainString: string
  keyBuffer: TypeofBuffer
}): TypeofBuffer => {
  // ? iv: Initialization Vector (first 12 bytes)
  const ivBuffer = (_.randomBytes as any)(12)

  // ? tag: Authentication Tag (last 16 bytes)
  // * createCipheriv
  const cipher = (_.createCipheriv as any)('aes-128-gcm', _.keyBuffer, ivBuffer, { authTagLength: 16 })

  // * cipher.update
  const cipheredBuffer = cipher.update(_.plainString, 'utf8')

  // * cipher.final
  const finalCipheredBuffer = cipher.final()

  // ? [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  return (_.Buffer as any).concat([ivBuffer, cipheredBuffer, finalCipheredBuffer, cipher.getAuthTag()])
}
