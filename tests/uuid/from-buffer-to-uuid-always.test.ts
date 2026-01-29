import { describe, expect, it } from 'bun:test'
import { FROM_BUFFER_TO_UUID_ALWAYS } from '../../ts/uuid/from-buffer-to-uuid-always.util.ts'

describe(
  'FROM_BUFFER_TO_UUID_ALWAYS',
  () => {
    it(
      'should convert buffer to UUID',
      () => {
        const buffer = Buffer.from([0x12, 0x3e, 0x45, 0x67, 0xe8, 0x9b, 0x12, 0xd3, 0xa4, 0x56, 0x42, 0x66, 0x14, 0x17, 0x40, 0x00])
        const result = FROM_BUFFER_TO_UUID_ALWAYS(buffer)
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
      }
    )
  }
)
