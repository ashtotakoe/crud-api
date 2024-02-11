import { RouteSegments } from './enums/route-segments.enum'
import { RouteData } from './interfaces/route-data.interface'
import { RouteHandler } from './types/route-handler.type'

export interface Route {
  path: string
  children: Route[] | RouteSegments.ID
  handler?: RouteHandler
}

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

export class Router {
  private routes = routes

  protected searchForRoute(path: string): Route | null {
    const segments = path.split('/').filter(path => path !== '')
    segments.unshift('/')

    const search = (targetSegments: string[], routes: Route[]): Route | null => {
      const currentSegment = targetSegments.shift()
      const targetRoute = routes.find(route => route.path === currentSegment)

      if (targetRoute) {
        return targetRoute.children === RouteSegments.ID ? targetRoute : search(targetSegments, targetRoute.children)
      }

      return null
    }

    return search(segments, this.routes)
  }

  public getHandler(routeData: RouteData): RouteHandler | null {
    const { path } = routeData

    const requiredRoute = this.searchForRoute(path)

    if (requiredRoute && requiredRoute.handler) {
      return requiredRoute.handler
    }

    return null
  }
}
