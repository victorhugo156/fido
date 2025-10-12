/*
  Warnings:

  - Added the required column `userId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Pet" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."bookings" ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "roles" SET DEFAULT ARRAY['PET_OWNER']::"public"."Role"[];

-- CreateTable
CREATE TABLE "public"."_PaymentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PaymentToPetSitter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentToPetSitter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PaymentToUser_B_index" ON "public"."_PaymentToUser"("B");

-- CreateIndex
CREATE INDEX "_PaymentToPetSitter_B_index" ON "public"."_PaymentToPetSitter"("B");

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentToUser" ADD CONSTRAINT "_PaymentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentToUser" ADD CONSTRAINT "_PaymentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentToPetSitter" ADD CONSTRAINT "_PaymentToPetSitter_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentToPetSitter" ADD CONSTRAINT "_PaymentToPetSitter_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."pet_sitters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
