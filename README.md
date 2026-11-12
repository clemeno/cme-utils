# cme-utils

[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)

A comprehensive collection of utility functions for TypeScript and JavaScript projects. Includes typed guards, conversion utilities, validation functions, and more to streamline development.

## Features

- **Type Safety**: Fully typed, with a declaration file for every export.
- **Zero Dependencies**: No runtime dependencies.
- **Tree-Shakable**: ESM output, one file per utility, `sideEffects: false` — bundlers drop whatever you do not import.
- **Modular Exports**: Import from the root barrel, or deep-import a single utility for the shortest path.
- **ESM-First**: Ships ES Modules; a CommonJS build is provided for the ESLint plugin entries.
- **Custom ESLint Plugin**: `max-return-statements-per-function`, usable from flat or legacy config.

## Installation

```bash
npm i cme-utils
pnpm i cme-utils
bun i cme-utils
```

## Usage

Import from the root barrel:

```typescript
import { UUID_V7 } from 'cme-utils'
const id = UUID_V7()
```

Or deep-import a single module directly (same value, shortest path):

```typescript
import { UUID_V7 } from 'cme-utils/m/uuid/uuid-v7.util.js'
```

Requires **Node >= 16**, and TypeScript >= 5.7 for its typings (or `skipLibCheck`): they use the generic `Uint8Array<ArrayBuffer>`. The package is ESM-first — use `import` or a bundler. CommonJS `require()` is supported only for the ESLint plugin entries (see below).

> `UUID_V4`, `UUID_V7`, `GET_RANDOM_INT_BETWEEN` and `GET_RANDOM_BYTE_LIST` draw from the global Web Crypto, which bun, browsers and Node 19+ have. Node 16 to 18 lack it by default: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`. With neither, they fall back to `Math.random()`, which is not cryptographically secure.
>
> `CIPHER_AES_GCM_TO_BYTES` and `DECIPHER_AES_GCM_BYTES_TO_UTF8` run AES-GCM on the same global Web Crypto; on Node 16 to 18 pass `crypto: webcrypto`. They have no fallback: without Web Crypto (Node 16 to 18 without it, a browser page served over http) their promise rejects.

## Quick Examples

### Array Operations
```typescript
import { ARRAY_MAX, ARRAY_MEDIAN, ARRAY_SUM } from 'cme-utils'

const numbers = [1, 5, 3, 9, 2]
ARRAY_MAX(numbers)    // 9
ARRAY_MEDIAN(numbers) // 3
ARRAY_SUM(numbers)    // 20
```

### Type Conversion
```typescript
import { TO_NUMBER } from 'cme-utils'

TO_NUMBER('123')      // 123
TO_NUMBER('123abc')   // NaN (invalid)
TO_NUMBER(true)       // 1
TO_NUMBER(new Date()) // timestamp
```

### UUID Generation
```typescript
import { UUID_V4, UUID_V7, UUID_V7_TO_TIMESTAMP_MS } from 'cme-utils'

const id = UUID_V7()
const timestamp = UUID_V7_TO_TIMESTAMP_MS(id) // Extract embedded timestamp
```

### Object Sorting
```typescript
import { SORT_OBJECTS } from 'cme-utils'

const users = [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}]
users.sort(SORT_OBJECTS({ on: u => u.age }))                    // Sort by age asc
users.sort(SORT_OBJECTS({ on: u => u.name, order: 'desc' }))   // Sort by name desc
```

### Value Normalization
```typescript
import { NORMALIZE_N_1 } from 'cme-utils'

// Pagination bounds checking
NORMALIZE_N_1({ n: 5, min: 1, max: 10 })    // '5' (valid)
NORMALIZE_N_1({ n: 15, min: 1, max: 10 })   // '10' (clamped)
NORMALIZE_N_1({ n: 'invalid', def: 1 })     // '1' (default)
```

### CSV Export
```typescript
import { TO_CSV_VALUE } from 'cme-utils'

TO_CSV_VALUE(42)              // '42'
TO_CSV_VALUE('Hello, World')  // '"Hello, World"' (quoted)
TO_CSV_VALUE(null)            // '' (empty)
```

## ESLint Plugin

`max-return-statements-per-function` flags functions with more return statements than allowed (default 1).

Flat config (`eslint.config.mjs`):

```javascript
import { MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN } from 'cme-utils/m/max-return-statements-per-function.plugin.js'

export default [
  {
    plugins: { 'max-return-statements-per-function': MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN },
    rules: { 'max-return-statements-per-function/max-return-statements-per-function': ['error', 1] },
  },
]
```

Legacy config (CommonJS):

```javascript
const plugin = require('cme-utils/cjs/max-return-statements-per-function.plugin.cjs')
```

The rule is also exported on its own — `cme-utils/m/max-return-statements-per-function.rule.js` (ESM) or `cme-utils/cjs/max-return-statements-per-function.rule.cjs` (CJS). The `GET_FUNCTION_NAME_WITH_KIND` and `GET_PROPERTY_NAME` AST helpers it relies on are exported from the root barrel for authoring your own rules.

## API Overview

The library is organized into the following categories:

- **aes**: AES encryption utilities (e.g., `CIPHER_AES_GCM_TO_BYTES` and `DECIPHER_AES_GCM_BYTES_TO_UTF8` on Web Crypto, `CIPHER_AES_GCM_TO_BUFFER` and `DECIPHER_AES_GCM_TO_UTF8` on `node:crypto`)
- **array**: Array operations (e.g., `ARRAY_SUM`, `ARRAY_AVERAGE`, `ARRAY_MIN_MAX`)
- **async**: Asynchronous utilities (e.g., `ALL_SETTLED`, `THROW_IF_ERROR`)
- **bigint**: BigInt division operations (e.g., `BIGINT_DIV`, `BIGINT_DIV_CEIL`, `BIGINT_DIV_FLOOR`, `BIGINT_DIV_ROUND`, `BIGINT_DIV_TRUNC`)
- **chart**: Charting helpers (e.g., time series functions)
- **check**: Type guards and validators (e.g., `IS_A_STRING`, `IS_NUMERIC`, `IS_BOOL`)
- **compare**: Comparison functions (e.g., `SAME_DATE`, `SAME_DATETIME`)
- **constant**: Constants (e.g., `MAX_SAFE_INTEGER`, `SYMBOLS`)
- **convert**: Conversion utilities (e.g., `TO_NUMBER`, `STRING_TO_UUID`, `BASE64_TO_HEX`)
- **eslint**: ESLint rule authoring helpers (e.g., `GET_FUNCTION_NAME_WITH_KIND`, `GET_PROPERTY_NAME`)
- **factory**: Object factories (e.g., `GET_ANY_ARRAY`)
- **file**: File operations (e.g., `DOWNLOAD_FILE`, `GET_FILE_FULL_TEXT_CONTENT`)
- **filter**: Filtering helpers (e.g., `GET_FILTER_BY_FROM_FILTER_LIST`)
- **form**: Form validators (e.g., `IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR`)
- **functional**: Functional programming (e.g., `IDENTITY`, `NOOP`)
- **http**: HTTP status codes and utilities (e.g., `HTTP_OK`, `HTTP_BAD_REQUEST`)
- **microsoft**: Microsoft-specific utilities (e.g., MSAL endpoints)
- **number**: Number formatting (e.g., `TO_LOCAL_NUMBER`)
- **object**: Object utilities (e.g., `GET_OBJECT_KEY_LIST`, `TRIM_OBJECT`)
- **password**: Password handling (e.g., `ENCRYPT_PASSWORD`, `COMPARE_PASSWORD`)
- **query**: Query builders (e.g., `WHERE`, `OR_WHERE_IN`)
- **regex**: Regular expressions (e.g., `REGEX_EMAIL`, `REGEX_UUID_MATCH_A_SUBSTRING`)
- **sort**: Sorting functions (e.g., `SORT_BY_LABEL`, `SORT_OBJECTS`)
- **space**: Localization (e.g., `SET_LOCALE`, `GET_LANG`)
- **string**: String manipulations (e.g., `STRING_UCF`, `EXTRACT_UUID_FROM_STRING`)
- **time**: Date/time utilities (e.g., `NOW`, `FROM_ISO_TO_LOCAL_DT`)
- **uuid**: UUID operations (e.g., `UUID_V4`, `UUID_V7`)
- **ws**: WebSocket helpers (e.g., `WS_AXIOS_SP_REQUEST`)

For full API details, see the [source code](https://github.com/clemeno/cme-utils/tree/main/ts) or generated type definitions.

## Development

### Building

```bash
bun run prepare      # Transpile ts/ → m/ (tsc)
```

### Linting

```bash
bun run lint         # Check code style (ESLint + neostandard)
bun run lint:fix     # Auto-fix linting issues
```

### Testing

```bash
bun test             # Run all tests
bun test:coverage    # Run tests with coverage
bun test:watch       # Run tests in watch mode
```

## Contributing

Contributions are welcome! Please ensure code follows the neostandard style and includes appropriate TypeScript types.

## License

MIT - see [LICENSE](LICENSE) for details.


