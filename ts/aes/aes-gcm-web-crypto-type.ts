import type { getRandomValuesFnType } from '../get-random-values-fn-type.js'

// the part of a Web Crypto object (globalThis.crypto, webcrypto of node:crypto) the AES-GCM utils use; the key stays
// unknown, as the DOM and Node types of a CryptoKey differ, and the method syntax lets their narrower key type in
export interface AesGcmWebCrypto {
  getRandomValues: getRandomValuesFnType
  subtle: {
    importKey (format: 'raw', keyData: Uint8Array<ArrayBuffer>, algorithm: 'AES-GCM', extractable: boolean, keyUsages: Array<'encrypt' | 'decrypt'>): Promise<unknown>
    encrypt (algorithm: { name: 'AES-GCM', iv: Uint8Array<ArrayBuffer>, tagLength: number }, key: unknown, data: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer>
    decrypt (algorithm: { name: 'AES-GCM', iv: Uint8Array<ArrayBuffer>, tagLength: number }, key: unknown, data: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer>
  }
}
