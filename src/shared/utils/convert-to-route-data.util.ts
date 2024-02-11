import { ParsedUrlQuery } from 'querystring'

import { RouteData } from '../../server/interfaces/route-data.interface'

export const convertToRouteData = (method: string, path: string, query: ParsedUrlQuery): RouteData => ({
  method,
  path,
  query,
})
