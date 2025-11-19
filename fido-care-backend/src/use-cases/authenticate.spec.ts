import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories.js'
import { AuthenticateUseCase } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credential-error.js'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate a new user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

describe('Authenticate Use Case', () => {
  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await expect(async () => {
      await authenticateUseCase.execute({
        email: 'john.martin@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

describe('Authenticate Use Case', () => {
  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'john.doe@example.com',
        password: '123457',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
