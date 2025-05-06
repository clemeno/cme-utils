import type { Settings } from 'luxon'

/** get the global locale from `Luxon` `Settings` */
export const GET_LOCALE = (_Settings: typeof Settings): string => _Settings.defaultLocale
