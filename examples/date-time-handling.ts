/**
 * Date and time handling examples
 * Demonstrates time utilities and date formatting
 */

import {
  FROM_ISO_TO_LOCAL_DT,
  FROM_UNIX_TO_LOCAL_DT,
  GET_GEO,
  GET_LANG,
  GET_LOCALE,
  GET_TZ,
  NOW_APP_ISO,
  NOW_UNIX,
  NOW_MS,
  NOW_UTC_ISO,
  SET_LOCALE,
  SET_TZ,
  TO_LOCAL_NUMBER_WITH_2_F_DIGITS,
  UUID_V7,
  UUID_V7_TO_TIMESTAMP_MS,
} from 'cme-utils'
import { DateTime, Settings } from 'luxon'

console.log('=== Current Time ===')

console.log('Current date/time:', NOW_MS())
console.log('ISO string:', NOW_UTC_ISO())
console.log('Unix timestamp:', NOW_UNIX())
console.log('Milliseconds:', NOW_MS())

console.log('\n=== UUID v7 with Timestamp ===')

// UUID v7 embeds timestamp information
const uuid = UUID_V7()
const timestamp = UUID_V7_TO_TIMESTAMP_MS(uuid)

console.log('UUID v7:', uuid)
console.log('Embedded timestamp:', new Date(timestamp))
console.log('Timestamp matches current time:', Math.abs(timestamp - Date.now()) < 1000) // within 1 second

console.log('\n=== Localization and Time Zone ===')

// the locale and timezone utils take luxon's DateTime and Settings, and keep the global locale and zone in Settings
SET_LOCALE({ Settings, locale: 'fr-CA' })
SET_TZ({ Settings, tz: 'Europe/Paris' })

console.log('Locale:', GET_LOCALE(Settings), '| lang:', GET_LANG(Settings), '| geo:', GET_GEO(Settings))
console.log('Timezone:', GET_TZ(Settings))
console.log('Now in the app timezone:', NOW_APP_ISO({ DateTime, Settings }))
console.log('Local number:', TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings, x: 1234.5 }))

console.log('\n=== Date Formatting ===')

const isoDate = '2024-01-15T10:30:45.123Z'
console.log('ISO input:', isoDate, '->', FROM_ISO_TO_LOCAL_DT({ DateTime, Settings, iso: isoDate }))

const unixTimestamp = 1705312245 // 2024-01-15 10:30:45 UTC
console.log('Unix timestamp:', unixTimestamp, '->', FROM_UNIX_TO_LOCAL_DT({ DateTime, Settings, unix: unixTimestamp }))
