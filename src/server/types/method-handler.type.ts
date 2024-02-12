import { DB } from '../../db/data-base'
import { SimpleResponse } from '../../shared/interfaces/simple-response.interface'
import { RouteData } from '../interfaces/route-data.interface'

// eslint-disable-next-line no-unused-vars
export type MethodHandler = (routeData: RouteData, state: DB) => SimpleResponse
