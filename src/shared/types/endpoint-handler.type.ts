import { RouteData } from '../interfaces/route-data.interface'
import { HTTPMethodHandler } from './http-method-handler.type'

// eslint-disable-next-line no-unused-vars
export type EndpointHandler = (routeData: RouteData) => HTTPMethodHandler | null
