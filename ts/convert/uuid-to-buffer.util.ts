import { TO_STRING } from './to-string.util.js'

/**
 * Converts a UUID string into a Buffer of its bytes (dashes removed, read as hexadecimal).
 * Runs on Node and bun only: a browser has no `Buffer`, unless the caller passes a polyfill (the `buffer` package).
 * @param _ - The UUID and the Buffer class
 * @param _.uuid - The UUID string
 * @param _.Buffer - The Node `Buffer` class
 * @returns The Buffer of the 16 bytes; an empty Buffer for an empty UUID
 * @example
 * ```typescript
 * UUID_TO_BUFFER({ uuid: '00010203-0405-0607-0809-0a0b0c0d0e0f', Buffer }) // returns Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
 * UUID_TO_BUFFER({ uuid: '', Buffer }) // returns Buffer.from([])
 * ```
 */
export function UUID_TO_BUFFER<Buffer = any, TypeofBuffer = any> (_: {
  uuid: any
  Buffer: TypeofBuffer
}): Buffer {
  return (_.Buffer as any).from(TO_STRING(_.uuid).replace(/-/g, ''), 'hex')
}
