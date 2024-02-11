import http from 'node:http'
import url from 'node:url'

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

      const handler = this.router.getHandler({ path: pathname ?? '', query, method: req.method ?? 'GET' })
      console.log(
        handler !== null ? handler({ path: pathname ?? '', query, method: req.method ?? 'GET' }) : 'Not found',
      )

      res.end()
    })
  }
  constructor({ port }: { port: number }) {
    this.port = port
  }
}
