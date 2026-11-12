import type { AesGcmWebCrypto } from './aes-gcm-web-crypto-type.js'

const ivByteCount = 12
const tagBitCount = 128

/**
 * Encrypts a UTF-8 string with AES-GCM on Web Crypto (`crypto.subtle`), with a random 12-byte IV and a 16-byte auth tag.
 * Its bytes are laid out as those of `CIPHER_AES_GCM_TO_BUFFER`, so `DECIPHER_AES_GCM_TO_UTF8` deciphers them with the same 16-byte key, and back.
 * Node 16 to 18 have no global `crypto` by default: pass `crypto: webcrypto` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * A browser has `crypto.subtle` only in a secure context (https or localhost). Without Web Crypto the promise rejects: AES has no safe fallback.
 * @param _ - The text, the key and the optional Web Crypto source
 * @param _.plainString - The text to encrypt
 * @param _.keyBytes - The raw AES key, a `Uint8Array` or a `Buffer`: 16 bytes (AES-128, as `CIPHER_AES_GCM_TO_BUFFER`), 24 or 32
 * @param _.crypto - The Web Crypto object; `globalThis.crypto` by default
 * @returns The bytes `[ IV (12 bytes), ciphertext, auth tag (16 bytes) ]`
 * @example
 * ```typescript
 * const keyBytes = webcrypto.getRandomValues(new Uint8Array(16))
 * ;(await CIPHER_AES_GCM_TO_BYTES({ plainString: 'Hello', keyBytes })).length // returns 33
 * ;(await CIPHER_AES_GCM_TO_BYTES({ plainString: '', keyBytes, crypto: webcrypto })).length // returns 28
 * await CIPHER_AES_GCM_TO_BYTES({ plainString: 'Hello', keyBytes: new Uint8Array(10) }) // throws a DataError: no AES key has 10 bytes
 * ```
 */
export async function CIPHER_AES_GCM_TO_BYTES (_: { plainString: string, keyBytes: Uint8Array, crypto?: AesGcmWebCrypto }): Promise<Uint8Array<ArrayBuffer>> {
  // missing on Node 16 to 18 unless injected, and crypto.subtle in a page served over http
  const webCrypto: Partial<AesGcmWebCrypto> | undefined = _.crypto ?? globalThis.crypto

  if ((typeof webCrypto?.subtle?.encrypt !== 'function') || (typeof webCrypto.getRandomValues !== 'function')) {
    throw new Error('CIPHER_AES_GCM_TO_BYTES needs Web Crypto (crypto.subtle and crypto.getRandomValues): on Node 16 to 18 pass crypto: webcrypto of node:crypto, in a browser serve the page over https')
  }

  const ivBytes = new Uint8Array(ivByteCount)
  webCrypto.getRandomValues(ivBytes)

  // a copy: Web Crypto refuses a view on a SharedArrayBuffer
  const key = await webCrypto.subtle.importKey('raw', new Uint8Array(_.keyBytes), 'AES-GCM', false, ['encrypt'])

  // ? Web Crypto appends the 16-byte auth tag to the ciphertext
  const ciphertextAndTag = new Uint8Array(await webCrypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBytes, tagLength: tagBitCount }, key, new TextEncoder().encode(_.plainString)))

  // ? [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD (body: dynamic), ...tag (tail: 16 bytes) ]
  const res = new Uint8Array(ivByteCount + ciphertextAndTag.length)
  res.set(ivBytes)
  res.set(ciphertextAndTag, ivByteCount)

  return res
}
