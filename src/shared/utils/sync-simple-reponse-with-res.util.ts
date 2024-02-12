import http, { ServerResponse } from 'http'

import { SimpleResponse } from '../interfaces/simple-response.interface'

export const syncSimpleResponseWithRes = (
  { headers, body, status }: SimpleResponse,
  res: ServerResponse<http.IncomingMessage>,
) => {
  res.writeHead(status, headers)
  res.write(body)
}
