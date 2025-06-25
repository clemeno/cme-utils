import { TO_STRING } from '../convert/to-string.util.js'

/**
 * * provide createDecipheriv -> import { createDecipheriv } from 'node:crypto'
 */
export const DECIPHER_AES_GCM_TO_UTF8 = <Buffer = any, TypeofBuffer = any, TypeofCreateDecipheriv = any> (_: {
  Buffer: TypeofBuffer
  createDecipheriv: TypeofCreateDecipheriv
  cipheredBuffer: Buffer
  keyBuffer: Buffer
}): string => {
  // ? cipheredByteList = [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  const cipheredByteList: number[] = Array.from(_.cipheredBuffer as any)

  const authTagLength = 16

  // ? iv: Initialization Vector (first 12 bytes)
  const cipheredIvBuffer = (_.Buffer as any).from(cipheredByteList.slice(0, 12))
  // * createDecipheriv
  const decipher = (_.createDecipheriv as any)('aes-128-gcm', _.keyBuffer, cipheredIvBuffer, { authTagLength })

  // ? tag: Authentication Tag (last 16 bytes)
  // * decipher.setAuthTag
  decipher.setAuthTag((_.Buffer as any).from(cipheredByteList.slice(0 - authTagLength)))

  // ? ciphertext: Encrypted Data PAYLOAD (dynamic bytes)
  const cipheredPayloadHex = (_.Buffer as any).from(cipheredByteList.slice(12, 0 - authTagLength)).toString('hex')
  // * decipher.update
  const deciphered = decipher.update(cipheredPayloadHex, 'hex', 'utf8')

  // * decipher.final
  // ? don't forget to finalize and return the deciphered text concatenated with the final deciphered part
  return `${TO_STRING(deciphered)}${TO_STRING(decipher.final('utf8'))}`
}
