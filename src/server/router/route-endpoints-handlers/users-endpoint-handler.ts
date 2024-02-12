import pathUtils from 'node:path'

import { createUser } from '../../../shared/user-factory'
import { createSimpleResponse } from '../../../shared/utils/create-simple-response'
import { extractUserDataFromBody } from '../../../shared/utils/extract-user-data-from-body.util'
import { validateUUID } from '../../../shared/utils/validate-uuid.util'
import { EndpointHandler } from '../../types/endpoint-handler.type'
import { HTTPMethodHandlers } from '../../types/http-method-handlers.type'

const invalidBodyResponse = createSimpleResponse({
  status: 400,
  body: 'Body is not valid. Please, provide all required properties',
})
const invalidIdResponse = createSimpleResponse({ status: 400, body: 'ID is not valid' })
const userDosNotExistResponse = createSimpleResponse({ status: 404, body: 'User does not exist' })

const methodHandlers: HTTPMethodHandlers = {
  users: {
    GET: (_, db) => {
      const users = db.getAllUsers()

      return createSimpleResponse({ body: JSON.stringify(users) })
    },

    POST: (routeData, db) => {
      const { body } = routeData

      if (!body) return invalidBodyResponse

      const userData = extractUserDataFromBody(body)

      if (!userData) return invalidBodyResponse

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

        return user ? createSimpleResponse({ body: JSON.stringify(user) }) : userDosNotExistResponse
      }

      return invalidIdResponse
    },

    PUT: ({ path, body }, db) => {
      const id = pathUtils.basename(path)

      if (validateUUID(id)) {
        if (!body) return invalidBodyResponse

        const userData = extractUserDataFromBody(body)
        if (!userData) return invalidBodyResponse

        const updatedUser = db.updateUser(id, userData)
        if (updatedUser) return createSimpleResponse({ status: 200, body: JSON.stringify(updatedUser) })

        return userDosNotExistResponse
      }

      return invalidIdResponse
    },

    DELETE: ({ path }, db) => {
      const id = pathUtils.basename(path)
      if (!validateUUID(id)) {
        return invalidIdResponse
      }

      const targetUser = db.getUser(id)
      if (targetUser) {
        db.deleteUser(id)
        return createSimpleResponse({ status: 204 })
      }

      return userDosNotExistResponse
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
