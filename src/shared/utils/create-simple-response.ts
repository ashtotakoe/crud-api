import { SimpleResponse } from '../interfaces/simple-response.interface'

export const createSimpleResponse = ({ headers, body, status }: Partial<SimpleResponse>): SimpleResponse => ({
  headers: headers ?? {},
  body: body ?? '',
  status: status ?? 200,
})
