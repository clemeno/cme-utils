import { TO_STRING } from '../convert/to-string.util.js'

/**
 * * provide createDecipheriv -> import { createDecipheriv } from 'node:crypto'
 */
export const DECIPHER_AES_GCM_TO_UTF8 = <TypeofCreateDecipheriv = any> (_: {
  createDecipheriv: TypeofCreateDecipheriv
  cipheredBuffer: Buffer
  keyBuffer: Buffer
}): string => {
  // ? cipheredByteList = [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  const cipheredByteList: number[] = Array.from(_.cipheredBuffer)

  const authTagLength = 16

  // ? iv: Initialization Vector (first 12 bytes)
  // * createDecipheriv
  const decipher = (_.createDecipheriv as any)('aes-128-gcm', _.keyBuffer, Buffer.from(cipheredByteList.slice(0, 12)), { authTagLength })

  // ? tag: Authentication Tag (last 16 bytes)
  // * decipher.setAuthTag
  decipher.setAuthTag(Buffer.from(cipheredByteList.slice(0 - authTagLength)))

  // ? ciphertext: Encrypted Data PAYLOAD (dynamic bytes)
  // * decipher.update
  const deciphered = decipher.update(Buffer.from(cipheredByteList.slice(12, 0 - authTagLength)).toString('hex'), 'hex', 'utf8')

  // * decipher.final
  // ? don't forget to finalize and return the deciphered text concatenated with the final deciphered part
  return `${TO_STRING(deciphered)}${TO_STRING(decipher.final('utf8'))}`
}
