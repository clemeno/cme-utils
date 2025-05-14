export const FROM_BASE_16_TO_UUID = (base16: string): string => {
  const hex = base16.padStart(32, '0').toLowerCase()
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
