import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import type {
  Availability,
  PetSitter,
  Service,
} from 'generated/prisma/index.js'
import type { PetSitterRepository } from '@/repositories/pet-sitter-repository.js'

// THIS LAYER IS IN CHARGE OF THE BUSINESS LOGIC

interface RegisterPetSitterCaseRequest {
  name: string
  email: string
  password: string
  bio: string
  profilePhoto: string
  coverPhoto: string
  address: string
  latitude: number
  longitude: number
  hourlyRate: number
  services: Service[]
  availability: Availability[]
  createdAt: Date
  updatedAt: Date
}

interface RegisterPetSitterCaseResponse {
  petSitter: PetSitter
}

// I am using the Dependency Inversion Principle to inject the repository into the use case.
// This is from the SOLID principles, where if one day I need to change the repository,
// for example, to a different database, instead of prisma I want to use a different one I can easily do it by changing the repository.
export class PetSitterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petSitterRepository: PetSitterRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    hourlyRate,
    services,
    availability,
  }: RegisterPetSitterCaseRequest): Promise<RegisterPetSitterCaseResponse> {
    const password_hash = await hash(password, 6)

    const petSitterWithSameEmail =
      await this.petSitterRepository.findByEmail(email)

    if (petSitterWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const petSitter = await this.petSitterRepository.create({
      name,
      email,
      password_hash,
      address,
      hourlyRate,
      services,
      availability,
      bio: '',
      password: '',
      profilePhoto: null,
      coverPhoto: null,
      latitude: null,
      longitude: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { petSitter }
  }
}
