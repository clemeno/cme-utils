import { describe, expect, it } from 'bun:test'
import { UUID_V7_TO_HEX } from '../../ts/uuid/uuid-v7-to-hex.util.ts'

describe(
  'UUID_V7_TO_HEX',
  () => {
    it(
      'should convert UUID v7 to hex',
      () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000'
        const result = UUID_V7_TO_HEX(uuid)
        expect(result).toMatch(/^[0-9a-f]+$/i)
      }
    )
  }
)
