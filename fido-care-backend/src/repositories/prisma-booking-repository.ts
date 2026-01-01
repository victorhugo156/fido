import { prisma } from '@/lib/prisma.js'
import { Prisma, type Booking } from '../../generated/prisma/index.js'
import type { BookingsRepository } from './bookings-repository.js'

export class PrismaBookingsRepository implements BookingsRepository {
  async findById(id: string): Promise<Booking | null> {
    const booking = await prisma.booking.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return booking
  }

  async create(data: Prisma.BookingUncheckedCreateInput) {
    const booking = await prisma.booking.create({
      data,
    })
    return booking
  }
}
