import { User } from '../shared/interfaces/user.interface'

class DB {
  private users: Record<string, User | undefined>

  constructor() {
    this.users = {}
  }

  getUser(key: string): User | null {
    return this.users[key] ?? null
  }

  setUser(key: string, user: User): void {
    this.users[key] = user
  }

  removeItem(key: string): void {
    this.users[key] = undefined
  }

  clear(): void {
    this.users = {}
  }

  get length(): number {
    return Object.entries(this.users).length
  }
}

export const db = new DB()
