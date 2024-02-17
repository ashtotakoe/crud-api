import { User } from '../shared/interfaces/user.interface'
import { UserWithoutID } from '../shared/types/user-without-id.type'

export class DB {
  private users: Record<string, User | undefined>

  constructor() {
    this.users = {}
  }

  getAllUsers(): User[] {
    const users = Object.keys(this.users).map(key => this.users[key])

    return users.some(user => user !== undefined) ? (users as User[]) : []
  }

  getUser(id: string): User | null {
    return this.users[id] ?? null
  }

  setUser(user: User): void {
    this.users[user.id] = user
  }

  deleteUser(id: string): void {
    this.users[id] = undefined
  }

  updateUser(id: string, newUserData: UserWithoutID): User | null {
    const user = this.users[id]

    if (user) {
      Object.assign(user, newUserData)

      return user
    }

    return null
  }

  clear(): void {
    this.users = {}
  }

  get length(): number {
    return Object.entries(this.users).length
  }
}
