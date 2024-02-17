import { UserWithoutID } from '../types/user-without-id.type'

export const extractUserDataFromBody = (body: string): UserWithoutID | null => {
  try {
    const { username, age, hobbies } = JSON.parse(body) as UserWithoutID

    return {
      username: typeof username === 'string' ? username : '',
      age: Number.isNaN(Number(age)) ? 0 : Number(age),
      hobbies: Array.isArray(hobbies) ? hobbies : [],
    }
  } catch (error) {
    return null
  }
}
