import http from 'node:http'
import url from 'node:url'

import { convertToRouteData } from '../shared/utils/convert-to-route-data.util'
import { Router } from './router'

export class Server {
  private server = http.createServer()
  private port: number

  private router = new Router()

  public start() {
    this.server.listen(this.port, () => {
      // console.log(`Listening on port ${this.port}`)
      // console.log(`http://localhost:${this.port}`)
    })

    this.server.on('request', (req, res) => {
      const { pathname, query } = url.parse(req.url ?? '', true)
      const routeData = convertToRouteData(req.method ?? 'GET', pathname ?? '', query)

      const handler = this.router.getHandler(routeData.path)
      console.log(handler !== null ? handler(routeData) : 'Not found')

      res.end()
    })
  }
  constructor({ port }: { port: number }) {
    this.port = port
  }
}
