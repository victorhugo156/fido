import { describe, expect, it } from 'vitest'
import { InMemoryBookingRepository } from '@/repositories/in-memory/in-memory-bookings-repositories.js'
import { BookingsUseCase } from './bookings.js'

describe('Booking Use Case', () => {
  it('should be able to make a booking', async () => {
    const inMemoryBookingRepository = new InMemoryBookingRepository()
    const bookingUseCase = new BookingsUseCase(inMemoryBookingRepository)

    const { booking } = await bookingUseCase.execute({
      id: 'sfhshf92u42942',
      petOwnerId: 'kfjkfje3iu3843',
      petSitterId: 'kjefsfje84728',
      petId: 'u94389ejifjie',
      date: new Date('2026-01-01T12:00:00Z'),
      time: 'AFTERNOON',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'kfjkfje3iu3843',
      paymentId: 'sjfhejfjhejfh',
      User: {
        id: 'kfjkfje3iu3843',
        email: 'owner@example.com',
        name: 'Pet Owner',
        password_hash: 'hashedpassword',
        photo: null,
        roles: ['PET_OWNER'],
        oneSignalPlayerId: null,
        address: '123 Main St',
        latitude: null,
        longitude: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      Payment: {
        id: 'sjfhejfjhejfh',
        amount: 100,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        bookingId: 'sfhshf92u42942', // Add this
        paymentMethod: 'CREDIT_CARD', // Add this (use a valid value from your enum)
      },
    })

    expect(booking.id).toEqual(expect.any(String))
  })
})
