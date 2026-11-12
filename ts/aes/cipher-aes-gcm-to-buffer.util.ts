/**
 * Encrypts a UTF-8 string with AES-128-GCM and a random 12-byte IV.
 * The platform APIs are provided by the caller: `import { Buffer } from 'node:buffer'` and `import { createCipheriv, randomBytes } from 'node:crypto'`.
 * Runs on Node and bun only: a browser has no `node:crypto`. `CIPHER_AES_GCM_TO_BYTES` does the same, with the same byte layout, on Web Crypto.
 * @param _ - The parameter object
 * @param _.Buffer - The `Buffer` class, used to concatenate the parts
 * @param _.createCipheriv - The `createCipheriv` function of `node:crypto`
 * @param _.randomBytes - The `randomBytes` function of `node:crypto`
 * @param _.plainString - The text to encrypt
 * @param _.keyBuffer - The 16-byte AES-128 key
 * @returns A Buffer laid out as `[ IV (12 bytes), ciphertext, auth tag (16 bytes) ]`
 * @example
 * ```typescript
 * const keyBuffer = randomBytes(16)
 * CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: 'Hello', keyBuffer }) // returns a 33-byte Buffer
 * CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: '', keyBuffer }) // returns a 28-byte Buffer
 * ```
 */
export function CIPHER_AES_GCM_TO_BUFFER<Buffer = any, TypeofBuffer = any, TypeofCreateCipheriv = any, TypeofRandomBytes = any> (_: {
  Buffer: TypeofBuffer
  createCipheriv: TypeofCreateCipheriv
  randomBytes: TypeofRandomBytes
  plainString: string
  keyBuffer: Buffer
}): Buffer {
  // ? iv: Initialization Vector (first 12 bytes)
  const ivBuffer = (_.randomBytes as any)(12)

  // ? tag: Authentication Tag (last 16 bytes)
  // * createCipheriv
  const cipher = (_.createCipheriv as any)('aes-128-gcm', _.keyBuffer, ivBuffer, { authTagLength: 16 })

  // * cipher.update
  const cipheredBuffer = cipher.update(_.plainString, 'utf8')

  // * cipher.final
  const finalCipheredBuffer = cipher.final()

  // * cipher.getAuthTag
  const authTag = cipher.getAuthTag()

  // ? [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  return (_.Buffer as any).concat([ivBuffer, cipheredBuffer, finalCipheredBuffer, authTag])
}
