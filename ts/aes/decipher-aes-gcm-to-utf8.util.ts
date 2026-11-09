import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Decrypts a Buffer made by `CIPHER_AES_GCM_TO_BUFFER` (AES-128-GCM) back to a UTF-8 string.
 * The platform APIs are provided by the caller: `import { Buffer } from 'node:buffer'` and `import { createDecipheriv } from 'node:crypto'`.
 * @param _ - The parameter object
 * @param _.Buffer - The `Buffer` class, used to slice the parts
 * @param _.createDecipheriv - The `createDecipheriv` function of `node:crypto`
 * @param _.cipheredBuffer - The ciphered data laid out as `[ IV (12 bytes), ciphertext, auth tag (16 bytes) ]`
 * @param _.keyBuffer - The 16-byte AES-128 key used to cipher
 * @returns The deciphered text
 * @example
 * ```typescript
 * const cipheredBuffer = CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: 'Hello', keyBuffer })
 * DECIPHER_AES_GCM_TO_UTF8({ Buffer, createDecipheriv, cipheredBuffer, keyBuffer }) // returns 'Hello'
 * // an empty text round-trips too
 * const emptyCipheredBuffer = CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: '', keyBuffer })
 * DECIPHER_AES_GCM_TO_UTF8({ Buffer, createDecipheriv, cipheredBuffer: emptyCipheredBuffer, keyBuffer }) // returns ''
 * ```
 */
export function DECIPHER_AES_GCM_TO_UTF8<Buffer = any, TypeofBuffer = any, TypeofCreateDecipheriv = any> (_: {
  Buffer: TypeofBuffer
  createDecipheriv: TypeofCreateDecipheriv
  cipheredBuffer: Buffer
  keyBuffer: Buffer
}): string {
  // ? cipheredByteList = [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  const cipheredByteList: number[] = Array.from(_.cipheredBuffer as any)

  const authTagLength = 16

  // ? iv: Initialization Vector (first 12 bytes)
  const cipheredIvBuffer = (_.Buffer as any).from(cipheredByteList.slice(0, 12))
  // * createDecipheriv
  const decipher = (_.createDecipheriv as any)('aes-128-gcm', _.keyBuffer, cipheredIvBuffer, { authTagLength })

  // ? tag: Authentication Tag (last 16 bytes)
  // * decipher.setAuthTag
  decipher.setAuthTag((_.Buffer as any).from(cipheredByteList.slice(-authTagLength)))

  // ? ciphertext: Encrypted Data PAYLOAD (dynamic bytes)
  const cipheredPayloadHex = (_.Buffer as any).from(cipheredByteList.slice(12, -authTagLength)).toString('hex')
  // * decipher.update
  const deciphered = decipher.update(cipheredPayloadHex, 'hex', 'utf8')

  // * decipher.final
  // ? don't forget to finalize and return the deciphered text concatenated with the final deciphered part
  return `${TO_STRING(deciphered)}${TO_STRING(decipher.final('utf8'))}`
}
