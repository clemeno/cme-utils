import { describe, expect, it } from 'bun:test'
import { BUFFER_TO_UUID } from '../../ts/convert/buffer-to-uuid.util.js'

describe(
  'BUFFER_TO_UUID',
  () => {
    const testCases = [
      {
        name: 'all-zero bytes yields nil UUID',
        input: Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        expected: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'last byte 1',
        input: Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
        expected: '00000000-0000-0000-0000-000000000001',
      },
      {
        name: 'known 16-byte buffer',
        input: Buffer.from([0x10, 0x97, 0x8b, 0xd5, 0x04, 0x00, 0x49, 0xb0, 0xb4, 0x9f, 0xde, 0xa3, 0x8b, 0x8c, 0x02, 0xf3]),
        expected: '10978bd5-0400-49b0-b49f-dea38b8c02f3',
      },
      {
        name: 'all 0xff bytes',
        input: Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
        expected: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
      },
      {
        name: 'buffer longer than 16 bytes uses only first 16',
        input: Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 99]),
        expected: '01000000-0000-0000-0000-000000000000',
      },
      {
        name: 'Uint8Array input',
        input: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]),
        expected: '00000000-0000-0000-0000-000000000002',
      },
      {
        name: 'plain array input',
        input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        expected: '00000000-0000-0000-0000-000000000003',
      },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BUFFER_TO_UUID(input)).toBe(expected)
      }
    )
  }
)
