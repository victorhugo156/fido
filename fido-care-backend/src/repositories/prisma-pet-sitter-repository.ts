import { prisma } from '@/lib/prisma.js'
import { Prisma, type PetSitter } from '../../generated/prisma/index.js'
import type { PetSitterRepository } from './pet-sitter-repository.js'

export class PrismaPetSitterRepository implements PetSitterRepository {
  findById(id: string): Promise<PetSitter | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<PetSitter | null> {
    const petSitter = await prisma.petSitter.findUnique({
      where: {
        email,
      },
    })
    return petSitter
  }

  async create(data: Prisma.PetSitterCreateInput) {
    const petSitter = await prisma.petSitter.create({
      data,
    })
    return petSitter
  }
}
