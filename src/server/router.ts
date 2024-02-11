import { routes } from './constants/routes'
import { RouteSegments } from './enums/route-segments.enum'
import { Route } from './interfaces/route.interface'
import { RouteHandler } from './types/route-handler.type'

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

  public getHandler(path: string): RouteHandler | null {
    const requiredRoute = this.searchForRoute(path)

    if (requiredRoute && requiredRoute.handler) {
      return requiredRoute.handler
    }

    return null
  }
}
