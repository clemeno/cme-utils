import { IS_NUMERIC, IS_SET } from 'check'
import { TO_STRING } from './to-string.util'

/**
 * * check if v is SET before using this function
 * @param v must be a boolean, `true` or `false`, or a numeric number
 * @returns `true` or `false` or **throws** an error when the input is not strct enough
 */
export const PARSE_BOOLEAN_STRICT_OR_THROW = (v: any): boolean => {
  let bRes = false

  if (typeof v === 'boolean') {
    bRes = v
  } else if (v === 'true') {
    bRes = true
  } else if (v === 'false') {
    bRes = false
  } else if (IS_NUMERIC(v)) {
    bRes = 0 !== +v
  } else {
    const vD = IS_SET(v) ? TO_STRING(v) : ((null === v) ? 'null' : 'undefined')

    throw new Error(`Invalid serialized boolean value: ${vD}`)
  }

  return bRes
}
