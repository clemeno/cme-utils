/**
 * Validation and type checking examples
 * Demonstrates various validation utilities
 */

import {
  IS_AN_ARRAY,
  IS_AN_OBJECT,
  IS_A_DATE,
  IS_A_FUNCTION,
  IS_A_NUMBER,
  IS_A_PUBLIC_URL,
  IS_A_STRING,
  IS_BOOL,
  IS_EMPTY,
  IS_EVEN,
  IS_NULL,
  IS_NUMERIC,
  IS_ODD,
  IS_SET,
  IS_UNDEFINED,
  IS_UUID_STRING,
  TO_STRING,
} from 'cme-utils'

console.log('=== Type Checking ===')

const testValues = [
  'hello',           // string
  42,                // number
  true,              // boolean
  null,              // null
  undefined,         // undefined
  [],                // empty array
  [1, 2, 3],         // array
  {},                // empty object
  { name: 'John' },  // object
  () => { },          // function
  new Date(),        // date
  'https://example.com', // URL
  '550e8400-e29b-41d4-a716-446655440000', // UUID
]

console.log('Value | isString | isNumber | isBool | isSet | isEmpty')
console.log('------|----------|----------|--------|-------|--------')
for (const v of testValues) {
  console.log(
    `${TO_STRING(IS_UNDEFINED(v) ? 'undefined' : (IS_NULL(v) ? 'null' : v)).padEnd(6)} | ${TO_STRING(IS_A_STRING(v)).padStart(8)} | ${TO_STRING(IS_A_NUMBER(v)).padStart(8)} | ${TO_STRING(IS_BOOL(v)).padStart(6)} | ${TO_STRING(IS_SET(v)).padStart(5)} | ${TO_STRING(IS_EMPTY(v)).padStart(7)}`
  )
}

console.log('\n=== Numeric Validation ===')

const numbers = [0, 1, 42, -5, 3.14, '123', 'abc', NaN, Infinity]
for (const num of numbers) {
  console.log(`${TO_STRING(num).padEnd(8)} -> isNumeric: ${TO_STRING(IS_NUMERIC(num))}, isEven: ${TO_STRING(IS_EVEN(num))}, isOdd: ${TO_STRING(IS_ODD(num))}`)
}

console.log('\n=== Collection Type Checking ===')

const collections = [
  [], [1, 2, 3], {}, { a: 1 }, new Set(), new Map(),
]

for (const col of collections) {
  console.log(`${col.constructor.name}: isArray=${TO_STRING(IS_AN_ARRAY(col))}, isObject=${TO_STRING(IS_AN_OBJECT(col))}`)
}

console.log('\n=== Special Validations ===')

const specialValues = [
  'https://example.com',
  'http://localhost:3000',
  'ftp://example.com',
  'not-a-url',
  '',
  '550e8400-e29b-41d4-a716-446655440000',
  'not-a-uuid',
  new Date(),
  new Date('invalid'),
]

for (const value of specialValues) {
  const strValue = TO_STRING(value)
  console.log(`${strValue.padEnd(35)} -> isURL: ${TO_STRING(IS_A_PUBLIC_URL(strValue))}, isUUID: ${TO_STRING(IS_UUID_STRING(strValue))}, isDate: ${TO_STRING(IS_A_DATE(strValue))}`)
}

console.log('\n=== Null/Undefined Checking ===')

const nullable = [null, undefined, '', 0, false, [], {}]
for (const value of nullable) {
  console.log(`${TO_STRING(value).padEnd(12)} -> isNull: ${TO_STRING(IS_NULL(value))}, isUndefined: ${TO_STRING(IS_UNDEFINED(value))}, isEmpty: ${TO_STRING(IS_EMPTY(value))}`)
}

console.log('\n=== Function Checking ===')

const functions = [
  () => { },
  function () { },
  class Test { },
  'not-a-function',
  42,
]

for (const func of functions) {
  console.log(`${TO_STRING(func).padEnd(20)} -> isFunction: ${TO_STRING(IS_A_FUNCTION(func))}`)
}
