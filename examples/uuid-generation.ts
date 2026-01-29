/**
 * UUID generation and manipulation examples
 * Demonstrates different UUID versions and utilities
 */

import {
  UUID_V4,
  UUID_V7,
  UUID_V7_TO_TIMESTAMP_MS,
  UUID_V7_TO_HEX,
  UUID_V4_TO_HEX,
  IS_UUID_STRING,
  EXTRACT_UUID_FROM_STRING,
  TO_STRING,
} from 'cme-utils'

console.log('=== UUID Generation ===')

// Generate different UUID versions
const uuid4 = UUID_V4()
const uuid7 = UUID_V7()

console.log('UUID v4 (random):', uuid4)
console.log('UUID v7 (time-based):', uuid7)

console.log('\n=== UUID v7 Features ===')

// UUID v7 embeds timestamp information
const timestamp = UUID_V7_TO_TIMESTAMP_MS(uuid7)
console.log('UUID v7 timestamp:', new Date(timestamp))
console.log('Age in milliseconds:', Date.now() - timestamp)

console.log('\n=== UUID Conversion ===')

// Convert UUIDs to hex format
console.log('UUID v4 to hex:', UUID_V4_TO_HEX(uuid4))
console.log('UUID v7 to hex:', UUID_V7_TO_HEX(uuid7))

console.log('\n=== UUID Validation ===')

const validUUIDs = [uuid4, uuid7, '550e8400-e29b-41d4-a716-446655440000']
const invalidUUIDs = ['not-a-uuid', '123', '', null, undefined]

console.log('Valid UUIDs:')
for (const uuid of validUUIDs) {
  console.log(`  ${uuid}: ${TO_STRING(IS_UUID_STRING(uuid))}`)
}

console.log('Invalid UUIDs:')
for (const uuid of invalidUUIDs) {
  console.log(`  ${TO_STRING(uuid)}: ${TO_STRING(IS_UUID_STRING(uuid))}`)
}

console.log('\n=== UUID Extraction ===')

// Extract UUIDs from text
const texts = [
  'User ID: 550e8400-e29b-41d4-a716-446655440000 created',
  'No UUID here',
  'Multiple: 550e8400-e29b-41d4-a716-446655440000 and 6ba7b810-9dad-11d1-80b4-00c04fd430c8',
]

for (const text of texts) {
  const extracted = EXTRACT_UUID_FROM_STRING(text)
  console.log(`Text: "${text}"`)
  console.log(`Extracted: "${extracted}"`)
  console.log()
}

console.log('=== UUID Sorting (v7 is time-sortable) ===')

// Generate UUIDs with timestamps
const uuids = Array.from({ length: 5 }, () => UUID_V7())

console.log('Generated UUIDs (should be roughly time-ordered):')
for (const uuid of uuids) {
  const ts = UUID_V7_TO_TIMESTAMP_MS(uuid)
  console.log(`${uuid} -> ${new Date(ts).toISOString()}`)
}

// Sort by UUID string (v7 maintains temporal order)
const sorted = [...uuids].sort()
console.log('\nSorted UUIDs (maintain temporal order):')
for (const uuid of sorted) {
  const ts = UUID_V7_TO_TIMESTAMP_MS(uuid)
  console.log(`${uuid} -> ${new Date(ts).toISOString()}`)
}
