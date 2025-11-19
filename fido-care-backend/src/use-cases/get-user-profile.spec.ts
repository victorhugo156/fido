import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories.js'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { ResourcesNotFoundError } from './errors/resources-not-found-error.js'

describe('Get User Profile Use Case', () => {
  it('should be able to get user profile', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new GetUserProfileUseCase(inMemoryUsersRepository)

    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await registerUseCase.execute({
      userId: createdUser.id,
    })
    expect(user.name).toEqual('John Doe')
  })
})

describe('Get User Profile Use Case', () => {
  it('should not be able to get user profile if user does not exist', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(
      inMemoryUsersRepository,
    )

    expect(async () => {
      await getUserProfileUseCase.execute({
        userId: 'non-existing-user-id',
      })
    }).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})
