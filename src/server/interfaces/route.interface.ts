import { RouteSegments } from '../enums/route-segments.enum'
import { RouteHandler } from '../types/route-handler.type'

export interface Route {
  path: string
  children: Route[] | RouteSegments.ID
  handler?: RouteHandler
}
