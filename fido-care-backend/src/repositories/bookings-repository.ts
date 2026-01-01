import { Prisma, type Booking } from '../../generated/prisma/index.js'

export interface BookingsRepository {
  findById(id: string): Promise<Booking | null>
  create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking>
}
