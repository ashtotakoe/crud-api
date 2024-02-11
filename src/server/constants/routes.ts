import { RouteSegments } from '../enums/route-segments.enum'
import { Route } from '../interfaces/route.interface'

export const routes: Route[] = [
  {
    path: '/',
    children: [
      {
        path: 'api',
        children: [
          {
            path: 'users',
            children: RouteSegments.ID,
            handler: () => 'handler works!!!',
          },
        ],
      },
    ],
  },
]
