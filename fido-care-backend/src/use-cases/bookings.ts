import type {
  Booking,
  BookingStatus,
  Payment,
  TimeSlot,
  User,
} from 'generated/prisma/index.js'
import { InvalidCredentialsError } from './errors/invalid-credential-error.js'
import type { BookingsRepository } from '@/repositories/bookings-repository.js'

interface BookingsUseCaseRequest {
  id: string
  petOwnerId: string
  petSitterId: string
  petId: string
  date: Date
  time: TimeSlot
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
  userId: string
  paymentId: string
  User: User
  Payment: Payment
}

interface BookingsUseCaseResponse {
  booking: Booking
}

export class BookingsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    id,
    petOwnerId,
    petSitterId,
    petId,
    date,
    time,
    status,
    createdAt,
    updatedAt,
    paymentId,
    User,
  }: BookingsUseCaseRequest): Promise<BookingsUseCaseResponse> {
    const booking = await this.bookingsRepository.create({
      id,
      petOwnerId,
      petSitterId,
      petId,
      date,
      time,
      status,
      createdAt,
      updatedAt,
      userId: User.id,
      paymentId,
    })

    if (!booking) {
      throw new InvalidCredentialsError()
    }

    return {
      booking,
    }
  }
}
