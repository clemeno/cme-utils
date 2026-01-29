/**
 * Basic usage examples for cme-utils
 * These examples demonstrate common patterns and use cases
 */

import {
  ARRAY_MAX,
  ARRAY_MEDIAN,
  TO_NUMBER,
  UUID_V4,
  UUID_V7,
  SORT_OBJECTS,
  IS_A_STRING,
  IS_NUMERIC,
  NORMALIZE_N_1,
  TO_CSV_VALUE,
} from 'cme-utils'

// ===== ARRAY OPERATIONS =====

console.log('=== Array Operations ===')

// Finding maximum values
const numbers = [1, 5, 3, 9, 2]
console.log('Max of', numbers, 'is', ARRAY_MAX(numbers)) // 9

const strings = ['apple', 'zebra', 'banana']
console.log('Max of', strings, 'is', ARRAY_MAX(strings)) // 'zebra'

// Calculating median
const data = [1, 3, 5, 7, 9]
console.log('Median of', data, 'is', ARRAY_MEDIAN(data)) // 5

const evenData = [1, 3, 5, 7]
console.log('Median of', evenData, 'is', ARRAY_MEDIAN(evenData)) // 4

// ===== TYPE CONVERSION =====

console.log('\n=== Type Conversion ===')

// Converting various types to numbers
console.log('String "123" to number:', TO_NUMBER('123')) // 123
console.log('String "123abc" to number:', TO_NUMBER('123abc')) // NaN
console.log('Boolean true to number:', TO_NUMBER(true)) // 1
console.log('Date to number:', TO_NUMBER(new Date())) // timestamp

// ===== UUID GENERATION =====

console.log('\n=== UUID Generation ===')

// Generate UUIDs
const uuid4 = UUID_V4()
const uuid7 = UUID_V7()

console.log('UUID v4:', uuid4)
console.log('UUID v7:', uuid7)

// ===== SORTING =====

console.log('\n=== Object Sorting ===')

const users = [
  { name: 'Alice', age: 25, score: 85 },
  { name: 'Bob', age: 30, score: 92 },
  { name: 'Charlie', age: 25, score: 78 },
]

// Sort by age ascending
users.sort(SORT_OBJECTS({ on: u => u.age }))
console.log('Sorted by age:', users.map(u => `${u.name}(${u.age})`))

// Sort by score descending
users.sort(SORT_OBJECTS({ on: u => u.score, order: 'desc' }))
console.log('Sorted by score desc:', users.map(u => `${u.name}(${u.score})`))

// ===== TYPE CHECKING =====

console.log('\n=== Type Checking ===')

console.log('Is "hello" a string?', IS_A_STRING('hello')) // true
console.log('Is 42 a string?', IS_A_STRING(42)) // false
console.log('Is "123" numeric?', IS_NUMERIC('123')) // true
console.log('Is "123abc" numeric?', IS_NUMERIC('123abc')) // false

// ===== NORMALIZATION =====

console.log('\n=== Value Normalization ===')

// Pagination bounds checking
console.log('Page 5 (valid):', NORMALIZE_N_1({ n: 5, min: 1, max: 10 })) // '5'
console.log('Page 15 (clamped):', NORMALIZE_N_1({ n: 15, min: 1, max: 10 })) // '10'
console.log('Page "invalid" (default):', NORMALIZE_N_1({ n: 'invalid', min: 1, max: 10, def: 1 })) // '1'

// ===== CSV EXPORT =====

console.log('\n=== CSV Export ===')

const csvData = [
  { name: 'John Doe', age: 30, city: 'New York, NY' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
]

console.log('CSV headers:', ['name', 'age', 'city'].map(TO_CSV_VALUE).join(','))
for (const row of csvData) {
  const csvRow = [
    TO_CSV_VALUE(row.name),
    TO_CSV_VALUE(row.age),
    TO_CSV_VALUE(row.city),
  ].join(',')
  console.log('CSV row:', csvRow)
}
