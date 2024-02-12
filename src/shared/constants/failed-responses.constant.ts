import { createSimpleResponse } from '../utils/create-simple-response.util'

export const failedResponses = {
  invalidBodyResponse: createSimpleResponse({
    status: 400,
    body: 'Body is not valid. Please, provide all required properties',
  }),
  invalidIdResponse: createSimpleResponse({ status: 400, body: 'ID is not valid' }),
  userDosNotExistResponse: createSimpleResponse({ status: 404, body: 'User does not exist' }),
}
