/*
  Warnings:

  - Added the required column `password_hash` to the `pet_sitters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pet_sitters" ADD COLUMN     "password_hash" TEXT NOT NULL;
