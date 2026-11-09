import { TO_STRING } from './to-string.util.js'

export function UUID_TO_BUFFER<Buffer = any, TypeofBuffer = any> (_: {
  uuid: any
  Buffer: TypeofBuffer
}): Buffer {
  return (_.Buffer as any).from(TO_STRING(_.uuid).replace(/-/g, ''), 'hex')
}
