export function FROM_ANY_TO_BUFFER <Buffer = any, TypeofBuffer = any> (_: { from: any, Buffer: TypeofBuffer }): Buffer {
  const bView = ArrayBuffer.isView(_.from)

  return bView ? (_.Buffer as any).from(_.from.buffer, _.from.byteOffset, _.from.byteLength) : (_.Buffer as any).from(_.from)
}
