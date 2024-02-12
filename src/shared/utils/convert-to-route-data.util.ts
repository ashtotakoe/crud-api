import { ParsedUrlQuery } from 'querystring'

import { RouteData } from '../../server/interfaces/route-data.interface'
import { HTTPMethods } from '../types/http-methods.type'

export const convertToRouteData = (method: HTTPMethods, path: string, query: ParsedUrlQuery, body = ''): RouteData => ({
  method,
  path,
  query,
  body
})
