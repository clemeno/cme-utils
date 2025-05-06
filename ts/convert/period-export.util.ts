import { TO_STRING } from './to-string.util'

export const PERIOD_EXPORT = (_: { min: any, max: any, label: string }): string => {
  return `${TO_STRING(_.min?.toISOString())}_§§_${TO_STRING(_.max?.toISOString())}_§§_${_.label}`
}
