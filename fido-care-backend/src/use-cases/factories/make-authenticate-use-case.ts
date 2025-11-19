import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'
import { AuthenticateUseCase } from '../authenticate.js'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const makeAuthenticateUseCase = new AuthenticateUseCase(usersRepository)

  return makeAuthenticateUseCase
}
