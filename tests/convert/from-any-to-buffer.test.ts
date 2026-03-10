import { describe, expect, it } from 'bun:test'
import { FROM_ANY_TO_BUFFER } from '../../ts/convert/from-any-to-buffer.util.js'

describe(
  'FROM_ANY_TO_BUFFER',
  () => {
    const arrayBufferViewTestCases = [
      {
        name: 'Uint8Array with known bytes',
        input: new Uint8Array([72, 101, 108, 108, 111]),
        expected: Buffer.from([72, 101, 108, 108, 111]),
      },
      {
        name: 'Uint8Array subarray with non-zero byteOffset',
        input: new Uint8Array([0, 72, 101, 108, 108, 111, 0]).subarray(1, 6),
        expected: Buffer.from([72, 101, 108, 108, 111]),
      },
      {
        name: 'Int16Array',
        input: new Int16Array([256, 512]),
        expected: Buffer.from(new Int16Array([256, 512]).buffer, 0, 4),
      },
      {
        name: 'DataView',
        input: new DataView(new Uint8Array([10, 20, 30]).buffer),
        expected: Buffer.from([10, 20, 30]),
      },
      {
        name: 'Buffer (is itself an ArrayBufferView)',
        input: Buffer.from([1, 2, 3]),
        expected: Buffer.from([1, 2, 3]),
      },
    ]

    it.each(arrayBufferViewTestCases)(
      'ArrayBufferView path — $name',
      ({ input, expected }) => {
        expect(FROM_ANY_TO_BUFFER<Buffer>({ Buffer, from: input })).toEqual(expected)
      }
    )

    const fallbackTestCases = [
      {
        name: 'string',
        input: 'hello',
        expected: Buffer.from('hello'),
      },
      {
        name: 'ArrayBuffer',
        input: new Uint8Array([7, 8, 9]).buffer,
        expected: Buffer.from([7, 8, 9]),
      },
      {
        name: 'array of bytes',
        input: [72, 101, 108, 108, 111],
        expected: Buffer.from([72, 101, 108, 108, 111]),
      },
    ]

    it.each(fallbackTestCases)(
      'fallback path — $name',
      ({ input, expected }) => {
        expect(FROM_ANY_TO_BUFFER<Buffer>({ Buffer, from: input })).toEqual(expected)
      }
    )
  }
)
