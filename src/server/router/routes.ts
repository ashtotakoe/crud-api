import { ROUTE_PATH_SEPARATOR } from '../../shared/constants/route-path-separator'
import { RouteSegments } from '../enums/route-segments.enum'
import { Route } from '../interfaces/route.interface'
import { usersEndpointHandler } from './route-endpoints-handlers/users-endpoint-handler'

export const routes: Route[] = [
  {
    path: ROUTE_PATH_SEPARATOR,
    children: [
      {
        path: 'api',
        children: [
          {
            path: 'users',
            children: RouteSegments.ID,
            handler: usersEndpointHandler,
          },
        ],
      },
    ],
  },
]
