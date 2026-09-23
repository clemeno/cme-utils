import { describe, expect, it } from 'bun:test'
import { FASTIFY_SP_DATE_SCHEMA } from '../../ts/time/app-sp-date.js'

describe(
  'FASTIFY_SP_DATE_SCHEMA',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is type object', actual: FASTIFY_SP_DATE_SCHEMA.type, expected: 'object' },
      { name: 'has date property of type string', actual: FASTIFY_SP_DATE_SCHEMA.properties.date.type, expected: 'string' },
      { name: 'has timezone_type property with enum [1, 2, 3]', actual: FASTIFY_SP_DATE_SCHEMA.properties.timezone_type.enum, expected: [1, 2, 3] },
      { name: 'has timezone property of type string', actual: FASTIFY_SP_DATE_SCHEMA.properties.timezone.type, expected: 'string' },
      { name: 'has timezone_type as type number', actual: FASTIFY_SP_DATE_SCHEMA.properties.timezone_type.type, expected: 'number' },
      {
        name: 'is exactly the date / timezone_type / timezone object schema',
        actual: FASTIFY_SP_DATE_SCHEMA,
        expected: {
          type: 'object',
          properties: {
            date: { type: 'string' },
            timezone_type: { type: 'number', enum: [1, 2, 3] },
            timezone: { type: 'string' },
          },
        },
      },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toStrictEqual(expected)
      }
    )
  }
)
