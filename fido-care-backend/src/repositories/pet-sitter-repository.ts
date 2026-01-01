import { Prisma, type PetSitter } from '../../generated/prisma/index.js'

export interface PetSitterRepository {
  findById(id: string): Promise<PetSitter | null>
  findByEmail(email: string): Promise<PetSitter | null>
  create(data: Prisma.PetSitterCreateInput): Promise<PetSitter>
}
