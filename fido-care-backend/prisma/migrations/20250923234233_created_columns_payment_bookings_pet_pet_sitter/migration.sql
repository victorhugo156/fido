/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Service" AS ENUM ('DOG_WALKING', 'PET_BOARDING', 'PET_GROOMING', 'PET_TRAINING', 'HOME_VISIT');

-- CreateEnum
CREATE TYPE "public"."Availability" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'ALL_DAY');

-- CreateEnum
CREATE TYPE "public"."PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "public"."PetType" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "public"."TimeSlot" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'ALL_DAY');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('PAYPAL', 'CREDIT_CARD');

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."pet_sitters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "coverPhoto" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "hourlyRate" INTEGER NOT NULL,
    "services" "public"."Service"[],
    "availability" "public"."Availability"[],
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pet_sitters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "size" "public"."PetSize"[],
    "type" "public"."PetType"[],

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" TEXT NOT NULL,
    "petOwnerId" TEXT NOT NULL,
    "petSitterId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" "public"."TimeSlot" NOT NULL,
    "status" "public"."BookingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_sitters_email_key" ON "public"."pet_sitters"("email");
