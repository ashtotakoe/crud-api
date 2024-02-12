import http from 'node:http'
import url from 'node:url'

import { DB } from '../db/data-base'
import { HTTPMethods } from '../shared/types/http-methods.type'
import { convertToRouteData } from '../shared/utils/convert-to-route-data.util'
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
      const { pathname, query } = url.parse(req.url ?? '', true)
      const routeData = convertToRouteData((req.method as HTTPMethods) ?? 'GET', pathname ?? '', query)

      const endPointHandler = this.router.getHandler(routeData.path)

      if (!endPointHandler) {
        res.end('no endpoint handler found ')
        return
      }

      const methodHandler = endPointHandler(routeData)

      console.log(routeData)
      methodHandler ? console.log(methodHandler(routeData, this.db)) : console.log('no method handler found')
      res.end()
    })
  }
  constructor({ port, db }: { port: number; db: DB }) {
    this.port = port
    this.db = db
  }
}
