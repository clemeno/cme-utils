import { describe, expect, it } from 'bun:test'
import type { hashFnType } from '../ts/hash-fn-type.js'

describe(
  'hashFnType',
  () => {
    it(
      'creates a hash function that resolves to a hashed string',
      async () => {
        const hash: hashFnType = async (_clear: string, _iterations: number) => 'hashedValue'
        const result = await hash('password', 10)
        expect(result).toBe('hashedValue')
      }
    )

    it(
      'hash function receives clear text and iteration count',
      async () => {
        let receivedClear = ''
        let receivedIterations = 0
        const hash: hashFnType = async (clear: string, iterations: number) => {
          receivedClear = clear
          receivedIterations = iterations
          return 'hash'
        }
        await hash('secret', 12)
        expect(receivedClear).toBe('secret')
        expect(receivedIterations).toBe(12)
      }
    )

    it(
      'hash function returns a Promise',
      () => {
        const hash: hashFnType = async (_clear: string, _iterations: number) => 'result'
        const promise = hash('x', 1)
        expect(promise).toBeInstanceOf(Promise)
      }
    )
  }
)
