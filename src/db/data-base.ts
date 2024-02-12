import { User } from '../shared/interfaces/user.interface'

export class DB {
  private users: Record<string, User | undefined>

  constructor() {
    this.users = {}
  }

  getAllUsers(): User[] {
    const users = Object.keys(this.users).map(key => this.users[key])
    return !users.some(user => user !== undefined) ? (users as User[]) : []
  }

  getUser(id: string): User | null {
    return this.users[id] ?? null
  }

  setUser(user: User): void {
    this.users[user.id] = user
  }

  removeItem(id: string): void {
    this.users[id] = undefined
  }

  clear(): void {
    this.users = {}
  }

  get length(): number {
    return Object.entries(this.users).length
  }
}
