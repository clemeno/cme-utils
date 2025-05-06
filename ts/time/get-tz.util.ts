import type { Settings } from 'luxon'

/** get the global timezone from `Luxon` `Settings` */
export const GET_TZ = (_Settings: typeof Settings): string => _Settings.defaultZone.name
