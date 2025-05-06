import { createDecipheriv } from 'node:crypto'

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
