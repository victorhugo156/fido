import type { UsersRepository } from '@/repositories/users-repository.js'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

// THIS LAYER IS IN CHARGE OF THE BUSINESS LOGIC

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

//I am using the Dependency Inversion Principle to inject the repository into the use case.
//This is from the SOLID principles, where if one day I need to change the repository,
//for example, to a different database, instead of prisma I want to use a different one I can easily do it by changing the repository.
export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
