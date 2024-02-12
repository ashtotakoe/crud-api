import path from 'path'

import { EndpointHandler } from '../../types/endpoint-handler.type'
import { HTTPMethodHandlers } from '../../types/http-method-handlers.type'

const methodHandlers: HTTPMethodHandlers = {
  users: {
    GET: () => 'hello from get handler',
    POST: () => 'hello from post handler',
  },
}

export const usersEndpointHandler: EndpointHandler = routeData => {
  const { method, path: routePath } = routeData

  const currentEndpoint = path.basename(routePath)

  const methodHandler = methodHandlers[currentEndpoint][method]

  return methodHandler ?? null
}
