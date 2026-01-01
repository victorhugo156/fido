import type { Prisma, Booking } from 'generated/prisma/index.js'
import type { BookingsRepository } from '../bookings-repository.js'
import { randomUUID } from 'crypto'

export class InMemoryBookingRepository implements BookingsRepository {
  public items: Booking[] = []

  async findById(id: string) {
    const booking = this.items.find((booking) => booking.id === id)

    if (!booking) {
      return null
    }

    return booking
  }

  async create(data: Prisma.BookingUncheckedCreateInput) {
    const booking = {
      id: randomUUID(),
      petOwnerId: data.petOwnerId,
      petSitterId: data.petSitterId,
      petId: data.petId,
      date: data.date as Date,
      time: data.time,
      status: data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
      paymentId: data.paymentId,
    }

    this.items.push(booking)

    return booking
  }
}
