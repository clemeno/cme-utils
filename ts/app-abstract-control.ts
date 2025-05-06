/** Mimic Angular forms `AbstractControl` abstract class definition */
export interface AppAbstractControl <TValue = any> {
  readonly value: TValue
}
