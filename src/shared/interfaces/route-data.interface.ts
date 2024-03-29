import { ParsedUrlQuery } from 'querystring'

import { HTTPMethods } from '../types/http-methods.type'

export interface RouteData {
  path: string
  query: ParsedUrlQuery
  method: HTTPMethods
  body?: string
}
