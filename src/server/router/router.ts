import { ROUTE_PATH_SEPARATOR } from '../../shared/constants/route-path-separator'
import { RouteSegments } from '../enums/route-segments.enum'
import { Route } from '../interfaces/route.interface'
import { EndpointHandler } from '../types/endpoint-handler.type'
import { routes } from './routes'

export class Router {
  private routes = routes

  protected searchForRoute(path: string): Route | null {
    const segments = path.split(ROUTE_PATH_SEPARATOR).filter(path => path !== '')
    segments.unshift(ROUTE_PATH_SEPARATOR)

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

  public getHandler(path: string): EndpointHandler | null {
    const requiredRoute = this.searchForRoute(path)

    if (requiredRoute && requiredRoute.handler) {
      return requiredRoute.handler
    }

    return null
  }
}
