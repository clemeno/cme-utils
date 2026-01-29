/**
 * Advanced usage patterns
 * Demonstrates complex combinations and real-world scenarios
 */

import {
  ARRAY_AVERAGE,
  ARRAY_MAX,
  ARRAY_MIN,
  IS_NUMERIC,
  NORMALIZE_N_1,
  SORT_OBJECTS,
  TO_CSV_VALUE,
  TO_NUMBER,
  TO_STRING,
  UUID_V7,
} from 'cme-utils'

console.log('=== Advanced Sorting Patterns ===')

// Complex object sorting with multiple criteria
interface Product {
  name: string
  price: number
  rating: number
  inStock: boolean
}

const products: Product[] = [
  { name: 'Laptop', price: 1200, rating: 4.5, inStock: true },
  { name: 'Mouse', price: 25, rating: 4.2, inStock: false },
  { name: 'Keyboard', price: 80, rating: 4.8, inStock: true },
  { name: 'Monitor', price: 300, rating: 4.3, inStock: true },
]

// Sort by price ascending, then by rating descending for same price
// eslint-disable-next-line max-params
products.sort((a, b) => {
  const priceDiff = a.price - b.price
  return priceDiff !== 0 ? priceDiff : b.rating - a.rating // higher rating first
})

console.log('Products sorted by price (asc), then rating (desc):')
for (const p of products) {
  console.log(`  ${p.name}: $${p.price}, ${p.rating}★`)
}

// Using SORT_OBJECTS for dynamic sorting
// eslint-disable-next-line max-params
const sortBy = (key: keyof Product, order: 'asc' | 'desc' = 'asc') => {
  return SORT_OBJECTS({
    on: (item: Product) => item[key],
    order,
    bPureNumeric: typeof products[0][key] === 'number',
  })
}

products.sort(sortBy('rating', 'desc'))
console.log('\nProducts sorted by rating (desc):')
for (const p of products) {
  console.log(`  ${p.name}: ${p.rating}★`)
}

console.log('\n=== Data Processing Pipeline ===')

// Simulate processing user input with validation and normalization
const processUserInput = (inputs: any[]) => {
  return inputs
    .map(input => TO_NUMBER(input))        // Convert to numbers
    .filter(IS_NUMERIC)                    // Remove invalid numbers
    .map(n => NORMALIZE_N_1({ n, min: 0, max: 100 })) // Clamp to 0-100
    .map(s => parseInt(s))                 // Back to numbers
}

const rawInputs = ['25', '150', 'abc', '50', '-5', '75']
const processed = processUserInput(rawInputs)

console.log('Raw inputs:', rawInputs)
console.log('Processed (0-100 range):', processed)
console.log('Statistics - Max:', ARRAY_MAX(processed), 'Min:', ARRAY_MIN(processed))

console.log('\n=== CSV Export with Complex Data ===')

interface User {
  id: string
  name: string
  email: string
  scores: number[]
  metadata: { registered: string, active: boolean }
}

const users: User[] = [
  {
    id: UUID_V7(),
    name: 'John Doe',
    email: 'john@example.com',
    scores: [85, 92, 78],
    metadata: { registered: '2024-01-15', active: true },
  },
  {
    id: UUID_V7(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    scores: [95, 88, 91],
    metadata: { registered: '2024-01-20', active: false },
  },
]

// Custom CSV export function
const exportToCSV = (data: User[]): string => {
  const headers = ['ID', 'Name', 'Email', 'Average Score', 'Registered', 'Active']

  const rows = data.map(user => [
    TO_CSV_VALUE(user.id),
    TO_CSV_VALUE(user.name),
    TO_CSV_VALUE(user.email),
    TO_CSV_VALUE(ARRAY_AVERAGE(user.scores)),
    TO_CSV_VALUE(user.metadata.registered),
    TO_CSV_VALUE(user.metadata.active),
  ])

  return [headers.map(header => TO_CSV_VALUE(header)), ...rows]
    .map(row => row.join(','))
    .join('\n')
}

console.log('CSV Export:')
console.log(exportToCSV(users))

console.log('\n=== Internationalization Example ===')

// Note: SET_LOCALE and FROM_ISO_TO_LOCAL_DT require Luxon DateTime/Settings objects
// For simple internationalization, use built-in Intl.DateTimeFormat
const dates = ['2024-01-15T10:30:00Z', '2024-07-04T15:45:00Z']

console.log('Sample dates for formatting:')
for (const date of dates) {
  console.log(`  ${date}`)
}
console.log('Use Intl.DateTimeFormat for locale-specific formatting')

console.log('\n=== Error Handling Patterns ===')

// Safe data processing with fallbacks
const safeProcessData = (data: any) => {
  let result = 0
  try {
    const num = TO_NUMBER(data)
    result = IS_NUMERIC(num) ? num : 0
  } catch {
    // result remains 0
  }
  return result
}

const riskyData = [42, '123', null, undefined, {}, 'not-a-number', new Date()]
console.log('Safe processing results:')
for (let i = 0; i < riskyData.length; i += 1) {
  const data = riskyData[i]
  console.log(`  Input ${i}: ${TO_STRING(data)} -> ${safeProcessData(data)}`)
}
