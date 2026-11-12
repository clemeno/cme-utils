import { afterEach, describe, expect, it } from 'bun:test'
import { Buffer } from 'node:buffer'
import { createCipheriv, createDecipheriv, randomBytes, webcrypto } from 'node:crypto'
import { type AesGcmWebCrypto, CIPHER_AES_GCM_TO_BUFFER, CIPHER_AES_GCM_TO_BYTES, DECIPHER_AES_GCM_BYTES_TO_UTF8, DECIPHER_AES_GCM_TO_UTF8 } from '../../ts/aes/index.js'
import { GET_RANDOM_BYTE_LIST } from '../../ts/number/get-random-byte-list.util.js'

describe(
  'CIPHER_AES_GCM_TO_BYTES and DECIPHER_AES_GCM_BYTES_TO_UTF8',
  () => {
    const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, 'crypto') ?? {}

    // restore even when an assertion fails, so a broken case can't leak a stub into other tests
    afterEach(() => {
      Object.defineProperty(globalThis, 'crypto', originalCrypto)
    })

    const textCases: Array<{ name: string, plainString: string }> = [
      { name: 'a text', plainString: 'Hello, world!' },
      { name: 'an empty text', plainString: '' },
      { name: 'emojis and accents', plainString: '🚀 Test with émojis and spéciâl chârs!' },
      { name: '10 KB', plainString: 'A'.repeat(10 * 1024) },
    ]

    it.each(textCases)(
      'round-trips $name on Web Crypto',
      async ({ plainString }) => {
        const keyBytes = webcrypto.getRandomValues(new Uint8Array(16))
        const cipheredBytes = await CIPHER_AES_GCM_TO_BYTES({ plainString, keyBytes })
        expect(await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes })).toBe(plainString)
      }
    )

    it(
      'round-trips with a key typed Uint8Array, from GET_RANDOM_BYTE_LIST',
      async () => {
        const keyBytes: Uint8Array = GET_RANDOM_BYTE_LIST({ length: 16 })
        const cipheredBytes = await CIPHER_AES_GCM_TO_BYTES({ plainString: 'Hello', keyBytes })
        expect(await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes })).toBe('Hello')
      }
    )

    /* Copies bytes onto a SharedArrayBuffer, a view Web Crypto refuses to read */
    function sharedCopyOf (bytes: Uint8Array): Uint8Array {
      const res = new Uint8Array(new SharedArrayBuffer(bytes.length))
      res.set(bytes)
      return res
    }

    it(
      'round-trips a key and ciphered bytes on a SharedArrayBuffer',
      async () => {
        const keyBytes = sharedCopyOf(webcrypto.getRandomValues(new Uint8Array(16)))
        const cipheredBytes = sharedCopyOf(await CIPHER_AES_GCM_TO_BYTES({ plainString: 'Hello', keyBytes }))
        expect(await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes })).toBe('Hello')
      }
    )

    it.each(textCases)(
      'deciphers $name ciphered by CIPHER_AES_GCM_TO_BUFFER (node:crypto)',
      async ({ plainString }) => {
        const keyBuffer = randomBytes(16)
        const cipheredBuffer = CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString, keyBuffer })
        expect(await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes: cipheredBuffer, keyBytes: keyBuffer })).toBe(plainString)
      }
    )

    it.each(textCases)(
      'ciphers $name for DECIPHER_AES_GCM_TO_UTF8 (node:crypto)',
      async ({ plainString }) => {
        const keyBuffer = randomBytes(16)
        const cipheredBuffer = Buffer.from(await CIPHER_AES_GCM_TO_BYTES({ plainString, keyBytes: keyBuffer }))
        expect(DECIPHER_AES_GCM_TO_UTF8({ Buffer, createDecipheriv, cipheredBuffer, keyBuffer })).toBe(plainString)
      }
    )

    // NIST GCM test cases 1 and 2 (McGrew and Viega, The Galois/Counter Mode of Operation): zero key, zero IV
    const zeroIvCrypto: AesGcmWebCrypto = { subtle: webcrypto.subtle, getRandomValues: array => array.fill(0) }
    const knownAnswerCases: Array<{ name: string, plainString: string, cipheredHex: string }> = [
      { name: 'an empty text (NIST case 1)', plainString: '', cipheredHex: '000000000000000000000000' + '58e2fccefa7e3061367f1d57a4e7455a' },
      { name: '16 zero bytes (NIST case 2)', plainString: '\0'.repeat(16), cipheredHex: '000000000000000000000000' + '0388dace60b6a392f328c2b971b2fe78' + 'ab6e47d42cec13bdf53a67b21257bddf' },
    ]

    it.each(knownAnswerCases)(
      'ciphers $name to the known bytes',
      async ({ plainString, cipheredHex }) => {
        const cipheredBytes = await CIPHER_AES_GCM_TO_BYTES({ plainString, keyBytes: new Uint8Array(16), crypto: zeroIvCrypto })
        expect(Buffer.from(cipheredBytes).toString('hex')).toBe(cipheredHex)
      }
    )

    it.each(knownAnswerCases)(
      'deciphers the known bytes of $name',
      async ({ plainString, cipheredHex }) => {
        const cipheredBytes = new Uint8Array(Buffer.from(cipheredHex, 'hex'))
        expect(await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes: new Uint8Array(16), crypto: webcrypto })).toBe(plainString)
      }
    )

    const cipherMissingMessage = 'CIPHER_AES_GCM_TO_BYTES needs Web Crypto (crypto.subtle and crypto.getRandomValues): on Node 16 to 18 pass crypto: webcrypto of node:crypto, in a browser serve the page over https'
    const decipherMissingMessage = 'DECIPHER_AES_GCM_BYTES_TO_UTF8 needs Web Crypto (crypto.subtle): on Node 16 to 18 pass crypto: webcrypto of node:crypto, in a browser serve the page over https'
    const keyBytes = new Uint8Array(16)
    const cipheredBytes = new Uint8Array(28)
    const getRandomValues = webcrypto.getRandomValues.bind(webcrypto)
    // the types refuse it, a JavaScript caller can still pass it
    const subtleOnlyCrypto = { subtle: webcrypto.subtle } as unknown as AesGcmWebCrypto

    const missingCases: Array<{ name: string, globalCrypto: unknown, run: () => Promise<unknown>, expected: Error }> = [
      { name: 'CIPHER rejects without a global crypto (Node 16 to 18)', globalCrypto: undefined, run: async () => await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes }), expected: new Error(cipherMissingMessage) },
      { name: 'CIPHER rejects without crypto.subtle (a page served over http)', globalCrypto: { getRandomValues }, run: async () => await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes }), expected: new Error(cipherMissingMessage) },
      { name: 'CIPHER rejects an injected crypto without getRandomValues', globalCrypto: webcrypto, run: async () => await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes, crypto: subtleOnlyCrypto }), expected: new Error(cipherMissingMessage) },
      { name: 'DECIPHER rejects without a global crypto (Node 16 to 18)', globalCrypto: undefined, run: async () => await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes }), expected: new Error(decipherMissingMessage) },
      { name: 'DECIPHER rejects without crypto.subtle (a page served over http)', globalCrypto: { getRandomValues }, run: async () => await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes, keyBytes }), expected: new Error(decipherMissingMessage) },
    ]

    it.each(missingCases)(
      '$name',
      async ({ globalCrypto, run, expected }) => {
        Object.defineProperty(globalThis, 'crypto', { value: globalCrypto, configurable: true, writable: true })
        await expect(run()).rejects.toThrow(expected)
      }
    )

    /* Ciphers 'x', then flips a bit of its first ciphertext byte, after the 12-byte IV */
    async function alteredCipheredBytes (): Promise<Uint8Array<ArrayBuffer>> {
      const bytes = await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes })
      bytes[12] ^= 1
      return bytes
    }

    it(
      'CIPHER lets the error of a throwing getRandomValues through, as is',
      async () => {
        const rngBroke = new Error('rng broke')
        const brokenRngCrypto: AesGcmWebCrypto = { subtle: webcrypto.subtle, getRandomValues: () => { throw rngBroke } }
        await expect(CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes, crypto: brokenRngCrypto })).rejects.toBe(rngBroke)
      }
    )

    // a DOMException can only be matched by its name
    const failingCases: Array<{ name: string, run: () => Promise<unknown>, expected: { name: string } }> = [
      { name: 'CIPHER lets subtle reject a 10-byte key', run: async () => await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes: new Uint8Array(10) }), expected: { name: 'DataError' } },
      { name: 'DECIPHER lets subtle reject a wrong key', run: async () => await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes: await CIPHER_AES_GCM_TO_BYTES({ plainString: 'x', keyBytes }), keyBytes: new Uint8Array(16).fill(1) }), expected: { name: 'OperationError' } },
      { name: 'DECIPHER lets subtle reject altered bytes', run: async () => await DECIPHER_AES_GCM_BYTES_TO_UTF8({ cipheredBytes: await alteredCipheredBytes(), keyBytes }), expected: { name: 'OperationError' } },
    ]

    it.each(failingCases)(
      '$name',
      async ({ run, expected }) => {
        await expect(run()).rejects.toMatchObject(expected)
      }
    )
  }
)
