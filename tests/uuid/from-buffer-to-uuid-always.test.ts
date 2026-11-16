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
      { name: 'keeps the first 16 of 17 bytes', input: new Uint8Array([...byteList, 0x99]), expected: '123e4567-e89b-12d3-a456-426614174000' },
      { name: 'returns the NIL UUID for an empty array', input: [], expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'returns the NIL UUID for null', input: null, expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'returns the NIL UUID for an object without toString', input: Object.create(null), expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'wraps 256 to 0, as a Uint8Array does', input: [1, 256], expected: '00000000-0000-0000-0000-000000000100' },
      { name: 'wraps -1 to 255, as a Uint8Array does', input: [-1], expected: '00000000-0000-0000-0000-0000000000ff' },
      { name: 'reads the toString(\'hex\') of an object', input: { toString: () => 'ff' }, expected: '00000000-0000-0000-0000-0000000000ff' },
      { name: 'returns the NIL UUID for an object whose text is not hex', input: {}, expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'returns the NIL UUID for a number', input: 255, expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'returns the NIL UUID for a bigint', input: 255n, expected: '00000000-0000-0000-0000-000000000000' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BUFFER_TO_UUID_ALWAYS(input)).toBe(expected)
      }
    )

    it(
      'lets the error of a throwing toString through',
      () => {
        expect(() => FROM_BUFFER_TO_UUID_ALWAYS({ toString: () => { throw new Error('no hex') } })).toThrow('no hex')
      }
    )
  }
)
