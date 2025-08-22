import { TO_STRING } from './to-string.util.js'

export const UUID_TO_BUFFER = <Buffer = any, TypeofBuffer = any> (_: {
  uuid: any
  Buffer: TypeofBuffer
}): Buffer => (_.Buffer as any).from(TO_STRING(_.uuid).replace(/-/g, ''), 'hex')
