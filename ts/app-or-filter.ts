import type { AppFilter } from './app-filter.js'

export class AppOrFilter {
  or: AppFilter[] = []

  constructor (_: Partial<AppOrFilter>) {
    Object.assign(this, _)
  }
}
