/*
  Warnings:

  - Added the required column `adhaar` to the `Officer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Officer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Officer" ADD COLUMN     "adhaar" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;
