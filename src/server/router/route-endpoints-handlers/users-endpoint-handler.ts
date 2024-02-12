import pathUtils from 'node:path'

import { User } from '../../../shared/interfaces/user.interface'
import { createUser } from '../../../shared/user-factory'
import { convertToSimpleResponse } from '../../../shared/utils/convert-to-simple-response'
import { validateUUID } from '../../../shared/utils/validate-uuid.util'
import { EndpointHandler } from '../../types/endpoint-handler.type'
import { HTTPMethodHandlers } from '../../types/http-method-handlers.type'

const methodHandlers: HTTPMethodHandlers = {
  users: {
    GET: (_, db) => {
      const users = db.getAllUsers()

      return convertToSimpleResponse({ body: JSON.stringify(users) })
    },
    POST: (routeData, db) => {
      const { body } = routeData
      const responseIfSomethingGoesWrong = convertToSimpleResponse({ status: 400, body: 'Body is not valid' })

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

      return convertToSimpleResponse({ status: 201, body: JSON.stringify(user) })
    },
  },

  id: {
    GET: ({ path }, db) => {
      const id = pathUtils.basename(path)
      if (validateUUID(id)) {
        const user = db.getUser(id)

        return user
          ? convertToSimpleResponse({ body: JSON.stringify(user) })
          : convertToSimpleResponse({ status: 404, body: 'User does not exist' })
      }

      return convertToSimpleResponse({ body: 'id is not valid', status: 400 })
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
