import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetSitterRepository } from '@/repositories/in-memory/in-memory-pet-sitter-repositories.js'
import { PetSitterUseCase } from './create-pet-sitter.js'
import { Availability, Service } from 'generated/prisma/index.js'
import { RegisterUseCase } from './register.js'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories.js'

describe('Register user as pet sitter', () => {
  it('should be able to create a new pet sitter profile', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
    const inMemoryPetSitterRepository = new InMemoryPetSitterRepository()
    const registerPetSitterUseCase = new PetSitterUseCase(
      inMemoryPetSitterRepository,
    )

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })
    if (user.id) {
      const { petSitter } = await registerPetSitterUseCase.execute({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('123456', 6),
        bio: 'I am a pet sitter',
        profilePhoto: 'https://example.com/profile.jpg',
        coverPhoto: 'https://example.com/cover.jpg',
        address: '123 Main St, Anytown, USA',
        latitude: 0,
        longitude: 0,
        hourlyRate: 100,
        services: [Service.DOG_WALKING],
        availability: [Availability.MORNING],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      expect(petSitter.id).toEqual(expect.any(String))
    }
  })
})
