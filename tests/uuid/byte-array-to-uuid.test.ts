import { describe, expect, it } from 'bun:test'
import { BYTE_ARRAY_TO_UUID } from '../../ts/uuid/byte-array-to-uuid.util.ts'

describe(
  'BYTE_ARRAY_TO_UUID',
  () => {
    it(
      'should convert byte array to UUID',
      () => {
        const bytes = new Uint8Array([0x12, 0x3e, 0x45, 0x67, 0xe8, 0x9b, 0x12, 0xd3, 0xa4, 0x56, 0x42, 0x66, 0x14, 0x17, 0x40, 0x00])
        const result = BYTE_ARRAY_TO_UUID(bytes)
        expect(result).toBe('123e4567-e89b-12d3-a456-426614174000')
      }
    )
  }
)
