/**
 * Date and time handling examples
 * Demonstrates time utilities and date formatting
 */

import {
  NOW_UNIX,
  NOW_MS,
  NOW_UTC_ISO,
  UUID_V7,
  UUID_V7_TO_TIMESTAMP_MS,
} from 'cme-utils'

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

console.log('\n=== Date Formatting ===')

const isoDate = '2024-01-15T10:30:45.123Z'
console.log('ISO input:', isoDate)
// Note: FROM_ISO_TO_LOCAL_DT requires Luxon DateTime/Settings objects

const unixTimestamp = 1705312245 // 2024-01-15 10:30:45 UTC
console.log('Unix timestamp:', unixTimestamp)
// Note: FROM_UNIX_TO_LOCAL_DT requires Luxon DateTime/Settings objects

console.log('\n=== Localization ===')

// Note: GET_LOCALE and SET_LOCALE require Luxon Settings objects
// For simple locale handling, use built-in Intl.DateTimeFormat

console.log('\n=== Time Zone Handling ===')

// Note: These utilities work with the Luxon DateTime library
// Timezone handling depends on your Luxon configuration
console.log('Local timezone formatting will respect your system settings')
