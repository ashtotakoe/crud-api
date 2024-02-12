import { SimpleResponse } from '../interfaces/simple-response.interface'

export const convertToSimpleResponse = ({ headers, body, status }: Partial<SimpleResponse>): SimpleResponse => ({
  headers: headers ?? {},
  body: body ?? '',
  status: status ?? 200,
})
