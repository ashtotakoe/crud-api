import { RouteData } from '../interfaces/route-data.interface'
import { MethodHandler } from './method-handler.type'

// eslint-disable-next-line no-unused-vars
export type EndpointHandler = (routeData: RouteData) => MethodHandler | null
