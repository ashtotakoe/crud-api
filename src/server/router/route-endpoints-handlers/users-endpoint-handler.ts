import pathUtils from 'node:path'

import { User } from '../../../shared/interfaces/user.interface'
import { createUser } from '../../../shared/user-factory'
import { createSimpleResponse } from '../../../shared/utils/create-simple-response'
import { validateUUID } from '../../../shared/utils/validate-uuid.util'
import { EndpointHandler } from '../../types/endpoint-handler.type'
import { HTTPMethodHandlers } from '../../types/http-method-handlers.type'

const methodHandlers: HTTPMethodHandlers = {
  users: {
    GET: (_, db) => {
      const users = db.getAllUsers()

      return createSimpleResponse({ body: JSON.stringify(users) })
    },
    POST: (routeData, db) => {
      const { body } = routeData
      const responseIfSomethingGoesWrong = createSimpleResponse({ status: 400, body: 'Body is not valid' })

      if (!body) return responseIfSomethingGoesWrong

      let userData: Omit<User, 'id'> | undefined
      try {
        userData = JSON.parse(body)
      } catch (error) {
        return responseIfSomethingGoesWrong
      }
      if (!userData) return responseIfSomethingGoesWrong
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

        return user
          ? createSimpleResponse({ body: JSON.stringify(user) })
          : createSimpleResponse({ status: 404, body: 'User does not exist' })
      }

      return createSimpleResponse({ body: 'id is not valid', status: 400 })
    },
    DELETE: ({ path }, db) => {
      const id = pathUtils.basename(path)
      if (!validateUUID(id)) {
        return createSimpleResponse({ status: 400, body: 'id is not valid' })
      }

      const targetUser = db.getUser(id)
      if (targetUser) {
        db.deleteUser(id)
        return createSimpleResponse({ status: 204 })
      }

      return createSimpleResponse({ status: 400, body: 'user does not exist' })
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
