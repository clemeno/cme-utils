export type ObjectWithKeyValueType<K extends string, V> = {
  [Key in K]: V
}
