/*
  Warnings:

  - Added the required column `adhaar` to the `Cleaner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cleaner" ADD COLUMN     "adhaar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "evaluatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Officer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
