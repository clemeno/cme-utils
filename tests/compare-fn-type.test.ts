import { describe, expect, it } from 'bun:test'
import type { compareFnType } from '../ts/compare-fn-type.js'

describe(
  'compareFnType',
  () => {
    it(
      'creates a compare function that resolves to true',
      async () => {
        const compare: compareFnType = async (_clear: string, _hash: string) => true
        const result = await compare('password', 'hash')
        expect(result).toBe(true)
      }
    )

    it(
      'creates a compare function that resolves to false',
      async () => {
        const compare: compareFnType = async (_clear: string, _hash: string) => false
        const result = await compare('wrong', 'x')
        expect(result).toBe(false)
      }
    )

    it(
      'compare function receives the clear text and hash arguments',
      async () => {
        let receivedClear = ''
        let receivedHash = ''
        const compare: compareFnType = async (clear: string, hash: string) => {
          receivedClear = clear
          receivedHash = hash
          return true
        }
        await compare('myPassword', 'myHash')
        expect(receivedClear).toBe('myPassword')
        expect(receivedHash).toBe('myHash')
      }
    )
  }
)
