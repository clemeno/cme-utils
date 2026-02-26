import { describe, expect, it } from 'bun:test'
import { UUID_TO_BUFFER } from '../../ts/convert/uuid-to-buffer.util.js'

describe(
  'UUID_TO_BUFFER',
  () => {
    const testCases = [
      {
        name: 'nil UUID yields 16 zero bytes',
        input: '00000000-0000-0000-0000-000000000000',
        expected: Buffer.alloc(16, 0),
      },
      {
        name: 'known UUID',
        input: '10978bd5-0400-49b0-b49f-dea38b8c02f3',
        expected: Buffer.from('10978bd5040049b0b49fdea38b8c02f3', 'hex'),
      },
      {
        name: 'all-ff UUID',
        input: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        expected: Buffer.alloc(16, 0xff),
      },
      {
        name: 'UUID without dashes',
        input: '10978bd5040049b0b49fdea38b8c02f3',
        expected: Buffer.from('10978bd5040049b0b49fdea38b8c02f3', 'hex'),
      },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        const result = UUID_TO_BUFFER({ uuid: input, Buffer })

        expect(result).toEqual(expected)
      }
    )
  }
)
