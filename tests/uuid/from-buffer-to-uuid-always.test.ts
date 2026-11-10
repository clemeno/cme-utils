import { describe, expect, it } from 'bun:test'
import { FROM_BUFFER_TO_UUID_ALWAYS } from '../../ts/uuid/from-buffer-to-uuid-always.util.js'

describe(
  'FROM_BUFFER_TO_UUID_ALWAYS',
  () => {
    const byteList = [0x12, 0x3e, 0x45, 0x67, 0xe8, 0x9b, 0x12, 0xd3, 0xa4, 0x56, 0x42, 0x66, 0x14, 0x17, 0x40, 0x00]

    const testCases: Array<{ name: string, input: unknown, expected: string }> = [
      { name: 'reads a Buffer', input: Buffer.from(byteList), expected: '123e4567-e89b-12d3-a456-426614174000' },
      // a browser has no Buffer: its bytes come as a Uint8Array
      { name: 'reads a Uint8Array', input: new Uint8Array(byteList), expected: '123e4567-e89b-12d3-a456-426614174000' },
      { name: 'reads an array of numbers', input: byteList, expected: '123e4567-e89b-12d3-a456-426614174000' },
      { name: 'left-pads a short Uint8Array with zeros', input: new Uint8Array([255]), expected: '00000000-0000-0000-0000-0000000000ff' },
      { name: 'returns the NIL UUID for null', input: null, expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'returns the NIL UUID for an object without toString', input: Object.create(null), expected: '00000000-0000-0000-0000-000000000000' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BUFFER_TO_UUID_ALWAYS(input)).toBe(expected)
      }
    )
  }
)
