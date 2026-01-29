/**
 * Array operations examples
 * Demonstrates various array utility functions
 */

import {
  ARRAY_MAX,
  ARRAY_MIN,
  ARRAY_MEDIAN,
  ARRAY_AVERAGE,
  ARRAY_SUM,
  ARRAY_MIN_MAX,
} from 'cme-utils'

console.log('=== Array Statistics ===')

// Sample data
const numbers = [10, 5, 8, 15, 3, 12, 7]
const salaries = [45000, 52000, 48000, 61000, 39000]
const temperatures = [-5, 0, 15, 22, 18, 25, 30]

console.log('Numbers:', numbers)
console.log('Sum:', ARRAY_SUM(numbers))
console.log('Average:', ARRAY_AVERAGE(numbers))
console.log('Median:', ARRAY_MEDIAN(numbers))
console.log('Min:', ARRAY_MIN(numbers))
console.log('Max:', ARRAY_MAX(numbers))
console.log('Min/Max:', ARRAY_MIN_MAX(numbers))

console.log('\n=== Salaries Analysis ===')
console.log('Salaries:', salaries)
console.log('Average salary:', ARRAY_AVERAGE(salaries))
console.log('Median salary:', ARRAY_MEDIAN(salaries))
console.log('Salary range:', ARRAY_MIN_MAX(salaries))

console.log('\n=== Temperature Data ===')
console.log('Temperatures:', temperatures)
console.log('Average temperature:', ARRAY_AVERAGE(temperatures))
console.log('Median temperature:', ARRAY_MEDIAN(temperatures))
console.log('Temperature extremes:', ARRAY_MIN_MAX(temperatures))

console.log('\n=== Edge Cases ===')

// Empty arrays
console.log('Empty array max:', ARRAY_MAX([])) // undefined
console.log('Empty array median:', ARRAY_MEDIAN([])) // NaN

// Arrays with null/undefined (filtered out)
const withNulls = [1, null, 5, undefined, 3]
console.log('With nulls - max:', ARRAY_MAX(withNulls)) // 5
console.log('With nulls - median:', ARRAY_MEDIAN([1, 5, 3])) // 3 (nulls filtered in actual usage)

// Mixed types (string comparison)
const mixed = ['apple', 'zebra', 'Banana', 'cherry']
console.log('String max (lexicographic):', ARRAY_MAX(mixed)) // 'zebra'

// Single element
console.log('Single element max:', ARRAY_MAX([42])) // 42
console.log('Single element median:', ARRAY_MEDIAN([42])) // 42
