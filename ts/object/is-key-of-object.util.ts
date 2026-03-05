import type { numeric } from '../numeric.js'

/** CHECK (is a `key` `of` `object` instance) */
export const IS_KEY_OF_OBJECT = (_: { key: numeric, of?: any }): boolean => {
  return (typeof _.of !== 'undefined') && (_.of !== null) && Object.keys(_.of as Record<string, any>).includes(`${_.key}`)
}
