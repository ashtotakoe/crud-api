import { DB } from '../../db/data-base'
import { RouteData } from '../interfaces/route-data.interface'
import { SimpleResponse } from '../interfaces/simple-response.interface'

// eslint-disable-next-line no-unused-vars
export type HTTPMethodHandler = (routeData: RouteData, state: DB) => SimpleResponse
