/**
 * Builds a Buffer from an array, a string or a typed array / view (sharing the view's memory).
 * Runs on Node and bun only: a browser has no `Buffer`, unless the caller passes a polyfill (the `buffer` package).
 * @param _ - The source and the Buffer class
 * @param _.from - The value to convert: an array, a string, an ArrayBuffer or a view such as `Uint8Array`
 * @param _.Buffer - The Node `Buffer` class
 * @returns The Buffer
 * @example
 * ```typescript
 * FROM_ANY_TO_BUFFER({ from: [1, 2], Buffer }) // returns Buffer.from([1, 2])
 * FROM_ANY_TO_BUFFER({ from: new Uint8Array([1, 2]), Buffer }) // returns Buffer.from([1, 2])
 * FROM_ANY_TO_BUFFER({ from: [], Buffer }) // returns Buffer.from([])
 * ```
 */
export function FROM_ANY_TO_BUFFER<Buffer = any, TypeofBuffer = any> (_: { from: any, Buffer: TypeofBuffer }): Buffer {
  const bView = ArrayBuffer.isView(_.from)

  return bView ? (_.Buffer as any).from(_.from.buffer, _.from.byteOffset, _.from.byteLength) : (_.Buffer as any).from(_.from)
}
