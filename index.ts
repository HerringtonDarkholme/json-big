import { stringify } from './lib/stringify'
import { JSONParse, Options } from './lib/parse'

export default function JSONBig(options?: Options) {
  return {
    parse: JSONParse(options),
    stringify,
  }
}
export const parse = JSONParse()
export const jsonStringify = stringify

// create the default method members with no options applied for backwards compatibility
JSONBig.parse = parse
JSONBig.stringify = stringify
