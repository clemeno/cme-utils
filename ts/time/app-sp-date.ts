/**
 * ## SpDate - Php Symfony Date representation when obtained fromSQL db
 * ### Timezone types:
 * - 1 - A UTC offset, such as in new DateTime("17 July 2013 -0300")
 * - 2 - A timezone abbreviation, such as in new DateTime("17 July 2013 GMT")
 * - 3 - A timezone identifier, such as in new DateTime( "17 July 2013", new DateTimeZone("Europe/London"))
 */
export interface AppSpDate {
  date: string
  timezone_type: 1 | 2 | 3
  timezone: string
}

export const FASTIFY_SP_DATE_SCHEMA = {
  type: 'object',
  properties: {
    date: { type: 'string' },
    timezone_type: {
      type: 'number',
      enum: [1, 2, 3],
    },
    timezone: { type: 'string' },
  },
} as const
