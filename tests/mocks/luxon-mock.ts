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
  toMillis () {
    return this.getTime()
  }

  plus (duration: DurationObjectUnits) {
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

  minus (duration: DurationObjectUnits) {
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

  startOf (unit: string) {
    const d = new Date(this.getTime())
    if (unit === 'day') {
      d.setHours(0, 0, 0, 0)
    }
    return new MockDateTimeInstance(d.getTime())
  }

  endOf (unit: string) {
    const d = new Date(this.getTime())
    if (unit === 'day') {
      d.setHours(23, 59, 59, 999)
    }
    return new MockDateTimeInstance(d.getTime())
  }

  toISO () {
    return this.toISOString()
  }

  toSQL (options?: { includeOffset?: boolean }) {
    return this.toISOString().replace('T', ' ').replace('Z', '')
  }

  setZone (tz: string) {
    // For simplicity, return this
    return this
  }

  toFormat (format: string) {
    const year = this.getFullYear().toString()
    const month = (this.getMonth() + 1).toString().padStart(2, '0')
    const day = this.getDate().toString().padStart(2, '0')

    let result: string
    switch (format) {
      case 'yyyy-MM-dd':
        result = `${year}-${month}-${day}`
        break
      case 'MM/dd/yyyy':
        result = `${month}/${day}/${year}`
        break
      case 'dd/MM/yyyy':
        result = `${day}/${month}/${year}`
        break
      default:
        // Fallback to yyyy-MM-dd for unsupported formats
        result = `${year}-${month}-${day}`
        break
    }
    return result
  }

  valueOf () {
    return this.getTime()
  }

  toUnixInteger () {
    return Math.floor(this.getTime() / 1000)
  }

  get year () {
    return this.getFullYear()
  }

  get month () {
    return this.getMonth() + 1
  }

  get day () {
    return this.getDate()
  }

  get hour () {
    return this.getHours()
  }

  get minute () {
    return this.getMinutes()
  }

  get second () {
    return this.getSeconds()
  }
}

// Mock Luxon DateTime with proper date formatting
export const mockDateTime = (millis: number) => new MockDateTimeInstance(millis)

// Mock DateTime class with static methods
export class MockDateTimeClass {
  static invalid (reason: string) {
    return null
  }

  static fromMillis (millis: number) {
    return mockDateTime(millis)
  }

  static fromISO (iso: string) {
    const date = new Date(iso)
    return mockDateTime(date.getTime())
  }

  // eslint-disable-next-line max-params
  static fromSQL (sql: string, options?: { zone?: string }) {
    const date = new Date(sql)
    return mockDateTime(date.getTime())
  }

  static fromSeconds (seconds: number) {
    return mockDateTime(seconds * 1000)
  }

  static local () {
    return mockDateTime(Date.now())
  }

  static utc () {
    return mockDateTime(Date.now())
  }
}

export const MockDateTime = MockDateTimeClass

export function createMockSettings ({ initialZone = 'UTC', initialLocale = 'en' } = {}) {
  return {
    defaultZone: { name: initialZone },
    defaultLocale: initialLocale,
  }
}
