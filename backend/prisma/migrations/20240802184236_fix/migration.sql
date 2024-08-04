/*
  Warnings:

  - Added the required column `number` to the `Cleaner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adhaar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'TimeLimitExceeded';

-- AlterTable
ALTER TABLE "Cleaner" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "finishedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adhaar" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Officer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Officer_username_key" ON "Officer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Officer_email_key" ON "Officer"("email");
