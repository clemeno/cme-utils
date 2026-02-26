import { describe, expect, it } from 'bun:test'
import type { bool } from '../ts/bool.js'

describe(
  'bool',
  () => {
    it(
      'accepts a true boolean value',
      () => {
        const v: bool = true
        expect(v).toBe(true)
      }
    )

    it(
      'accepts a false boolean value',
      () => {
        const v: bool = false
        expect(v).toBe(false)
      }
    )

    it(
      'accepts a numeric 1',
      () => {
        const v: bool = 1
        expect(v).toBe(1)
      }
    )

    it(
      'accepts a numeric 0',
      () => {
        const v: bool = 0
        expect(v).toBe(0)
      }
    )

    it(
      'accepts a string "1"',
      () => {
        const v: bool = '1'
        expect(v).toBe('1')
      }
    )

    it(
      'accepts a string "true"',
      () => {
        const v: bool = 'true'
        expect(v).toBe('true')
      }
    )

    it(
      'accepts a string "0"',
      () => {
        const v: bool = '0'
        expect(v).toBe('0')
      }
    )
  }
)
