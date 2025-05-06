import { AppExceptionOnly } from './app-exception-only.js'

/** expect an { exception, result } */
export class AppExceptionResult extends AppExceptionOnly {
  result: any = undefined
}
