import http from 'node:http'
import url from 'node:url'

import { DB } from '../db/data-base'
import { SimpleResponse } from '../shared/interfaces/simple-response.interface'
import { HTTPMethods } from '../shared/types/http-methods.type'
import { convertToRouteData } from '../shared/utils/convert-to-route-data.util'
import { createSimpleResponse } from '../shared/utils/create-simple-response.util'
import { writeToResponse } from '../shared/utils/write-to-response.util'
import { Router } from './router/router'

export class Server {
  private server = http.createServer()
  private port: number
  private db: DB

  private router = new Router()

  public start() {
    this.server.listen(this.port, () => {
      // console.log(`Listening on port ${this.port}`)
      // console.log(`http://localhost:${this.port}`)
    })

    this.server.on('request', (req, res) => {
      const pathWasNotFoundResponse = createSimpleResponse({ status: 404, body: 'path was not found' })
      let buff = ''

      req.on('data', data => (buff += data.toString()))
      req.on('end', () => {
        const { pathname, query } = url.parse(req.url ?? '', true)
        const routeData = convertToRouteData((req.method as HTTPMethods) ?? 'GET', pathname ?? '', query, buff)

        const endPointHandler = this.router.getHandler(routeData.path ?? '')

        if (!endPointHandler) {
          writeToResponse(pathWasNotFoundResponse, res)
          return
        }

        const methodHandler = endPointHandler(routeData)

        if (methodHandler) {
          let responseData: SimpleResponse
          try {
            responseData = methodHandler(routeData, this.db)
          } catch (error) {
            writeToResponse(createSimpleResponse({ status: 500, body: 'Internal server error' }), res)
            return
          }
          writeToResponse(responseData, res)
          return
        }

        writeToResponse(pathWasNotFoundResponse, res)
      })
    })
  }
  constructor({ port, db }: { port: number; db: DB }) {
    this.port = port
    this.db = db
  }
}
