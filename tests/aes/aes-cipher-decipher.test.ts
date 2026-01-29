import { describe, expect, it } from 'bun:test'
import { Buffer } from 'node:buffer'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { CIPHER_AES_GCM_TO_BUFFER, DECIPHER_AES_GCM_TO_UTF8 } from '../../ts/aes/index.js'

describe(
  'AES CIPHER and DECIPHER Utilities',
  () => {
    describe(
      'CIPHER_AES_GCM_TO_BUFFER and DECIPHER_AES_GCM_TO_UTF8',
      () => {
        const testCases = [
          { name: 'should encrypt and decrypt a string correctly', input: 'Hello, world!' },
          { name: 'should handle empty string', input: '' },
          { name: 'should handle special characters', input: '🚀 Test with émojis and spéciâl chârs!' },
          { name: 'should handle large text', input: 'A'.repeat(10 * 1024) }, // 10KB of 'A's for consistency
        ]

        it.each(testCases)(
          '%s',
          testCase => {
            const input = testCase.input
            const keyBuffer = randomBytes(16)

            const cipheredBuffer = CIPHER_AES_GCM_TO_BUFFER({ Buffer, createCipheriv, randomBytes, plainString: input, keyBuffer })

            expect(Buffer.isBuffer(cipheredBuffer)).toBe(true)
            expect(cipheredBuffer.length).toBeGreaterThan(input.length)

            const decryptedString = DECIPHER_AES_GCM_TO_UTF8({ Buffer, createDecipheriv, cipheredBuffer, keyBuffer })

            expect(decryptedString).toBe(input)
          }
        )
      }
    )
  }
)
