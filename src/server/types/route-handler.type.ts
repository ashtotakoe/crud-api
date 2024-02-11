import { RouteData } from '../interfaces/route-data.interface'

// eslint-disable-next-line no-unused-vars
export type RouteHandler = (routeData: RouteData) => string | null | boolean
