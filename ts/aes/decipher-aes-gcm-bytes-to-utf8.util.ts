import type { AesGcmWebCrypto } from './aes-gcm-web-crypto-type.js'

const ivByteCount = 12

/**
 * Decrypts bytes made by `CIPHER_AES_GCM_TO_BYTES` or `CIPHER_AES_GCM_TO_BUFFER` (AES-GCM) back to a UTF-8 string, on Web Crypto (`crypto.subtle`).
 * Node 16 to 18 have no global `crypto` by default: pass `crypto: webcrypto` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * A browser has `crypto.subtle` only in a secure context (https or localhost). Without Web Crypto the promise rejects: AES has no safe fallback.
 * @param _ - The ciphered bytes, the key and the optional Web Crypto source
 * @param _.cipheredBytes - The ciphered data laid out as `[ IV (12 bytes), ciphertext, auth tag (16 bytes) ]`, a `Uint8Array` or a `Buffer`
 * @param _.keyBytes - The raw AES key used to cipher, a `Uint8Array` or a `Buffer`
 * @param _.crypto - The Web Crypto object; `globalThis.crypto` by default
 * @returns The deciphered text; the promise rejects with an `OperationError` for a wrong key or altered bytes
 * @example
 * ```typescript
 * const keyBytes = webcrypto.getRandomValues(new Uint8Array(16))
 * const cipheredBytes = await CIPHER_AES_GCM_TO_BYTES({ plainString: 'Hello', keyBytes })
 * await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes }) // returns 'Hello'
 * // bytes of the Node API decipher too
 * const cipheredBuffer = CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: '', keyBuffer: Buffer.from(keyBytes) })
 * await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes: cipheredBuffer, keyBytes, crypto: webcrypto }) // returns ''
 * await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes: new Uint8Array(16) }) // throws an OperationError: wrong key
 * ```
 */
export async function DECIPHER_AES_GCM_BYTES_TO_UTF8 (_: { cipheredBytes: Uint8Array, keyBytes: Uint8Array, crypto?: AesGcmWebCrypto }): Promise<string> {
  // missing on Node 16 to 18 unless injected, and crypto.subtle in a page served over http
  const webCrypto: AesGcmWebCrypto | undefined = _.crypto ?? globalThis.crypto

  if (typeof webCrypto?.subtle?.decrypt !== 'function') {
    throw new Error('DECIPHER_AES_GCM_BYTES_TO_UTF8 needs Web Crypto (crypto.subtle): on Node 16 to 18 pass crypto: webcrypto of node:crypto, in a browser serve the page over https')
  }

  // copies: Web Crypto refuses a view on a SharedArrayBuffer
  const key = await webCrypto.subtle.importKey('raw', new Uint8Array(_.keyBytes), 'AES-GCM', false, ['decrypt'])
  const cipheredBytes = new Uint8Array(_.cipheredBytes)

  // ? [ ...iv (head: 12 bytes), ...ciphertext PAYLOAD and tag (tail: 16 bytes), which Web Crypto takes as one ]
  const plainBytes = await webCrypto.subtle.decrypt({ name: 'AES-GCM', iv: cipheredBytes.subarray(0, ivByteCount), tagLength: 128 }, key, cipheredBytes.subarray(ivByteCount))

  return new TextDecoder().decode(plainBytes)
}
