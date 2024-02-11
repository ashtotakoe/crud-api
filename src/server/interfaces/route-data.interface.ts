import { ParsedUrlQuery } from 'querystring'

export interface RouteData {
  path: string
  query: ParsedUrlQuery
  method: string
}
