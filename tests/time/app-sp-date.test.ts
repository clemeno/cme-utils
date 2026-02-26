import { describe, expect, it } from 'bun:test'
import { FASTIFY_SP_DATE_SCHEMA } from '../../ts/time/app-sp-date.js'

describe(
  'FASTIFY_SP_DATE_SCHEMA',
  () => {
    it(
      'is type object',
      () => {
        expect(FASTIFY_SP_DATE_SCHEMA.type).toBe('object')
      }
    )

    it(
      'has date property of type string',
      () => {
        expect(FASTIFY_SP_DATE_SCHEMA.properties.date.type).toBe('string')
      }
    )

    it(
      'has timezone_type property with enum [1, 2, 3]',
      () => {
        expect(FASTIFY_SP_DATE_SCHEMA.properties.timezone_type.enum).toEqual([1, 2, 3])
      }
    )

    it(
      'has timezone property of type string',
      () => {
        expect(FASTIFY_SP_DATE_SCHEMA.properties.timezone.type).toBe('string')
      }
    )

    it(
      'has timezone_type as type number',
      () => {
        expect(FASTIFY_SP_DATE_SCHEMA.properties.timezone_type.type).toBe('number')
      }
    )
  }
)
