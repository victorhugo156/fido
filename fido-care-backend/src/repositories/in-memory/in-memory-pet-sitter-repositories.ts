import type { Prisma, PetSitter, Service } from 'generated/prisma/index.js'
import type { PetSitterRepository } from '../pet-sitter-repository.js'
import { randomUUID } from 'crypto'

export class InMemoryPetSitterRepository implements PetSitterRepository {
  public items: PetSitter[] = []

  async findById(id: string) {
    const petSitter = this.items.find((petSitter) => petSitter.id === id)

    if (!petSitter) {
      return null
    }

    return petSitter
  }

  async findByEmail(email: string) {
    const petSitter = this.items.find((petSitter) => petSitter.email === email)

    if (!petSitter) {
      return null
    }

    return petSitter
  }

  async create(data: Prisma.PetSitterCreateInput) {
    const petSitter = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      bio: data.bio,
      profilePhoto: data.profilePhoto ?? null,
      coverPhoto: data.coverPhoto ?? null,
      address: data.address,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      hourlyRate: data.hourlyRate,
      services: data.services as Service[],
      availability: data.availability ?? [],
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PetSitter

    this.items.push(petSitter)

    return petSitter
  }
}
