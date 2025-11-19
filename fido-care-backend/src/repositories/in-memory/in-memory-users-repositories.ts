import type { Prisma, User } from 'generated/prisma/index.js'
import type { UsersRepository } from '../users-repository.js'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      photo: null,
      roles: [],
      oneSignalPlayerId: null,
      address: null,
      latitude: null,
      longitude: null,
    }

    this.items.push(user)

    return user
  }
}
