export function FROM_ANY_TO_BUFFER (_: any): Buffer {
  return ArrayBuffer.isView(_) ? Buffer.from(_.buffer, _.byteOffset, _.byteLength) : Buffer.from(_)
}
