import pathUtils from 'node:path'

import { failedResponses } from '../../../shared/constants/failed-responses.constant'
import { EndpointHandler } from '../../../shared/types/endpoint-handler.type'
import { HTTPMethodHandlers } from '../../../shared/types/http-method-handlers.type'
import { createUser } from '../../../shared/user-factory'
import { createSimpleResponse } from '../../../shared/utils/create-simple-response.util'
import { extractUserDataFromBody } from '../../../shared/utils/extract-user-data-from-body.util'
import { validateUUID } from '../../../shared/utils/validate-uuid.util'

const methodHandlers: HTTPMethodHandlers = {
  users: {
    GET: (_, db) => {
      const users = db.getAllUsers()

      return createSimpleResponse({ body: JSON.stringify(users) })
    },

    POST: (routeData, db) => {
      const { body } = routeData

      if (!body) return failedResponses.invalidBodyResponse

      const userData = extractUserDataFromBody(body)

      if (!userData) return failedResponses.invalidBodyResponse

      const user = createUser(userData)
      db.setUser(user)

      return createSimpleResponse({ status: 201, body: JSON.stringify(user) })
    },
  },

  id: {
    GET: ({ path }, db) => {
      const id = pathUtils.basename(path)
      if (validateUUID(id)) {
        const user = db.getUser(id)

        return user ? createSimpleResponse({ body: JSON.stringify(user) }) : failedResponses.userDosNotExistResponse
      }

      return failedResponses.invalidIdResponse
    },

    PUT: ({ path, body }, db) => {
      const id = pathUtils.basename(path)

      if (validateUUID(id)) {
        if (!body) return failedResponses.invalidBodyResponse

        const userData = extractUserDataFromBody(body)
        if (!userData) return failedResponses.invalidBodyResponse

        const updatedUser = db.updateUser(id, userData)
        if (updatedUser) return createSimpleResponse({ status: 200, body: JSON.stringify(updatedUser) })

        return failedResponses.userDosNotExistResponse
      }

      return failedResponses.invalidIdResponse
    },

    DELETE: ({ path }, db) => {
      const id = pathUtils.basename(path)
      if (!validateUUID(id)) {
        return failedResponses.invalidIdResponse
      }

      const targetUser = db.getUser(id)
      if (targetUser) {
        db.deleteUser(id)
        return createSimpleResponse({ status: 204 })
      }

      return failedResponses.userDosNotExistResponse
    },
  },
}

export const usersEndpointHandler: EndpointHandler = routeData => {
  const { method, path: routePath } = routeData
  const hostName = 'users'

  let currentEndpoint = pathUtils.basename(routePath)

  if (currentEndpoint !== hostName) currentEndpoint = 'id'

  const methodHandler = methodHandlers[currentEndpoint][method]

  return methodHandler ?? null
}
