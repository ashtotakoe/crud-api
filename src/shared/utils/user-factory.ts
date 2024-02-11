import { User } from '../interfaces/user.interface'
import { generateNewUUID } from './generate-new-uuid.util'

export const createUser = ({ username, age, hobbies }: Omit<User, 'id'>): User => ({
  username,
  age,
  hobbies,
  id: generateNewUUID(),
})
