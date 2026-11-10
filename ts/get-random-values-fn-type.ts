// a Web Crypto `getRandomValues`, bound to its `crypto`: it fills the array it gets with random bytes and returns it
// (ArrayBuffer-backed: Node's webcrypto types refuse a SharedArrayBuffer)
export type getRandomValuesFnType = (array: Uint8Array<ArrayBuffer>) => Uint8Array
