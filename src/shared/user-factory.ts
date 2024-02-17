import { User } from './interfaces/user.interface'
import { UserWithoutID } from './types/user-without-id.type'
import { generateNewUUID } from './utils/generate-new-uuid.util'

export const createUser = ({ username, age, hobbies }: UserWithoutID): User => ({
  username: String(username) ?? 'undefined',
  age: Number(age) || 0,
  hobbies: hobbies ?? [],
  id: generateNewUUID(),
})
