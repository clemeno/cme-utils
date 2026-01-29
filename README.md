# cme-utils

[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)

A comprehensive collection of utility functions for TypeScript and JavaScript projects. Includes typed guards, conversion utilities, validation functions, and more to streamline development.

## Features

- **Type Safety**: Fully typed with TypeScript for better development experience.
- **Zero Dependencies**: No runtime dependencies, keeping your bundle size minimal.
- **Modular Exports**: Organized by categories for easy importing.
- **ES Modules & CommonJS**: Supports both ESM and CJS builds.
- **Custom ESLint Plugins**: Includes plugins for code quality (e.g., max return statements per function).

## Installation

```bash
npm i cme-utils
pnpm i cme-utils
bun i cme-utils
```

## Usage

Import specific utilities as needed:

```typescript
import { UUID_V7 } from 'cme-utils'
const id = UUID_V7()
```

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

## API Overview

The library is organized into the following categories:

- **aes**: AES encryption utilities (e.g., `CIPHER_AES_GCM_TO_BUFFER`, `DECIPHER_AES_GCM_TO_UTF8`)
- **array**: Array operations (e.g., `ARRAY_SUM`, `ARRAY_AVERAGE`, `ARRAY_MIN_MAX`)
- **async**: Asynchronous utilities (e.g., `ALL_SETTLED`, `THROW_IF_ERROR`)
- **chart**: Charting helpers (e.g., time series functions)
- **check**: Type guards and validators (e.g., `IS_A_STRING`, `IS_NUMERIC`, `IS_BOOL`)
- **compare**: Comparison functions (e.g., `SAME_DATE`, `SAME_DATETIME`)
- **constant**: Constants (e.g., `MAX_SAFE_INTEGER`, `SYMBOLS`)
- **convert**: Conversion utilities (e.g., `TO_NUMBER`, `STRING_TO_UUID`, `BASE64_TO_HEX`)
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
npm run build      # Build the javascript library
```

### Linting

```bash
npm run lint       # Check code style
npm run lint:fix   # Fix linting issues
```

### Testing

```bash
npm test            # Run all tests
npm run test:coverage  # Run tests with coverage
npm run test:watch  # Run tests in watch mode
```

## Contributing

Contributions are welcome! Please ensure code follows the neostandard style and includes appropriate TypeScript types.

## License

MIT - see [LICENSE](LICENSE) for details.


