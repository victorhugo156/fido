import type { UsersRepository } from '@/repositories/users-repository.js'
import type { User } from 'generated/prisma/index.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourcesNotFoundError()
    }

    return {
      user,
    }
  }
}
