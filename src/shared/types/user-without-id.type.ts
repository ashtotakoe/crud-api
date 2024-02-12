import { User } from '../interfaces/user.interface'

export type UserWithoutID = Omit<User, 'id'>
