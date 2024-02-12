import { User } from './interfaces/user.interface'
import { generateNewUUID } from './utils/generate-new-uuid.util'

export const createUser = ({ username, age, hobbies }: Omit<User, 'id'>): User => ({
  username: username ?? 'undefined',
  age: age ? age : 0,
  hobbies: hobbies ?? [],
  id: generateNewUUID(),
})
