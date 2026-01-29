import { describe, expect, it } from 'bun:test'
import { UUID_V4_TO_0XHEX } from '../../ts/uuid/uuid-v4-to-0xhex.util.ts'

describe(
  'UUID_V4_TO_0XHEX',
  () => {
    it(
      'should convert UUID v4 to 0x hex',
      () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000'
        const result = UUID_V4_TO_0XHEX(uuid)
        expect(result).toMatch(/^0x[0-9a-f]+$/i)
      }
    )
  }
)
