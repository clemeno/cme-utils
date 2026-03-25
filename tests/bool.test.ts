import { describe, expect, it } from 'bun:test'
import type { bool } from '../ts/bool.js'

describe(
  'bool',
  () => {
    const testCases: Array<{ name: string, value: bool }> = [
      { name: 'true boolean', value: true },
      { name: 'false boolean', value: false },
      { name: 'numeric 1', value: 1 },
      { name: 'numeric 0', value: 0 },
      { name: 'string "1"', value: '1' },
      { name: 'string "true"', value: 'true' },
      { name: 'string "0"', value: '0' },
    ]

    it.each(testCases)(
      '$name',
      ({ value }) => {
        const v: bool = value
        expect(v).toBe(value)
      }
    )
  }
)
