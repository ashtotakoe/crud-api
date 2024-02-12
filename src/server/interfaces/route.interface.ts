import { RouteSegments } from '../enums/route-segments.enum'
import { EndpointHandler } from '../types/endpoint-handler.type'

export interface Route {
  path: string
  children: Route[] | RouteSegments.ID
  handler?: EndpointHandler
}
