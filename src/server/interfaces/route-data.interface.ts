import { ParsedUrlQuery } from 'querystring'

import { HTTPMethods } from '../../shared/types/http-methods.type'

export interface RouteData {
  path: string
  query: ParsedUrlQuery
  method: HTTPMethods
}
