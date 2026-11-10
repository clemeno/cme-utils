// Define DurationObjectUnits interface for testing
export interface DurationObjectUnits {
  years?: number
  quarters?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

// Mock DateTime instance class extending Date
class MockDateTimeInstance extends Date {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (millis: number) {
    super(millis)
  }

  toMillis (): number {
    return this.getTime()
  }

  // like Luxon: an unparseable or invalid() DateTime reports isValid false
  get isValid (): boolean {
    return !isNaN(this.getTime())
  }

  plus (duration: DurationObjectUnits): MockDateTimeInstance {
    const totalMs = (duration.years ?? 0) * 31536000000 +
      (duration.quarters ?? 0) * 7776000000 +
      (duration.months ?? 0) * 2592000000 +
      (duration.weeks ?? 0) * 604800000 +
      (duration.days ?? 0) * 86400000 +
      (duration.hours ?? 0) * 3600000 +
      (duration.minutes ?? 0) * 60000 +
      (duration.seconds ?? 0) * 1000 +
      (duration.milliseconds ?? 0)
    return new MockDateTimeInstance(this.getTime() + totalMs)
  }

  minus (duration: DurationObjectUnits): MockDateTimeInstance {
    const totalMs = (duration.years ?? 0) * 31536000000 +
      (duration.quarters ?? 0) * 7776000000 +
      (duration.months ?? 0) * 2592000000 +
      (duration.weeks ?? 0) * 604800000 +
      (duration.days ?? 0) * 86400000 +
      (duration.hours ?? 0) * 3600000 +
      (duration.minutes ?? 0) * 60000 +
      (duration.seconds ?? 0) * 1000 +
      (duration.milliseconds ?? 0)
    return new MockDateTimeInstance(this.getTime() - totalMs)
  }

  startOf (unit: string): MockDateTimeInstance {
    const d = new Date(this.getTime())
    if (unit === 'day') {
      d.setHours(0, 0, 0, 0)
    }
    return new MockDateTimeInstance(d.getTime())
  }

  endOf (unit: string): MockDateTimeInstance {
    const d = new Date(this.getTime())
    if (unit === 'day') {
      d.setHours(23, 59, 59, 999)
    }
    return new MockDateTimeInstance(d.getTime())
  }

  toISO (): string {
    return this.toISOString()
  }

  // like Luxon: an invalid DateTime has no SQL representation
  toSQL (options?: { includeOffset?: boolean }): string | null {
    return this.isValid ? this.toISOString().replace('T', ' ').replace('Z', '') : null
  }

  setZone (tz: string): this {
    // For simplicity, return this
    return this
  }

  toFormat (format: string): string {
    const year = this.getFullYear().toString()
    const month = (this.getMonth() + 1).toString().padStart(2, '0')
    const day = this.getDate().toString().padStart(2, '0')

    const formatMap: Record<string, string> = {
      'MM/dd/yyyy': `${month}/${day}/${year}`,
      'dd/MM/yyyy': `${day}/${month}/${year}`,
    }

    // Fallback to yyyy-MM-dd for any other format
    return formatMap[format] ?? `${year}-${month}-${day}`
  }

  valueOf (): number {
    return this.getTime()
  }

  toUnixInteger (): number {
    return Math.floor(this.getTime() / 1000)
  }

  get year (): number {
    return this.getFullYear()
  }

  get month (): number {
    return this.getMonth() + 1
  }

  get day (): number {
    return this.getDate()
  }

  get hour (): number {
    return this.getHours()
  }

  get minute (): number {
    return this.getMinutes()
  }

  get second (): number {
    return this.getSeconds()
  }
}

// Mock Luxon DateTime with proper date formatting
export function mockDateTime (millis: number): MockDateTimeInstance {
  return new MockDateTimeInstance(millis)
}

// Mock DateTime class with static methods
export class MockDateTimeClass {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor () {}

  // like Luxon: invalid() returns a DateTime instance whose isValid is false, not null
  static invalid (reason: string): MockDateTimeInstance {
    return mockDateTime(NaN)
  }

  static fromMillis (millis: number): MockDateTimeInstance {
    return mockDateTime(millis)
  }

  static fromISO (iso: string): MockDateTimeInstance {
    const date = new Date(iso)

    return mockDateTime(date.getTime())
  }

  // eslint-disable-next-line max-params
  static fromSQL (sql: string, options?: { zone?: string }): MockDateTimeInstance {
    const date = new Date(sql)

    return mockDateTime(date.getTime())
  }

  static fromSeconds (seconds: number): MockDateTimeInstance {
    return mockDateTime(seconds * 1000)
  }

  static local (): MockDateTimeInstance {
    return mockDateTime(Date.now())
  }

  static utc (): MockDateTimeInstance {
    return mockDateTime(Date.now())
  }
}

export const MockDateTime = MockDateTimeClass

// shortcut: no defaultZone setter, so SET_TZ on this mock stores a bare string; test SET_TZ with luxon's Settings
export function createMockSettings ({ initialZone = 'UTC', initialLocale = 'en' } = {}): { defaultZone: { name: string }, defaultLocale: string } {
  return {
    defaultZone: { name: initialZone },
    defaultLocale: initialLocale,
  }
}
