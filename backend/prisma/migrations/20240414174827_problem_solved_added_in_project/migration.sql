/*
  Warnings:

  - You are about to drop the column `CNR` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "problemsSolved" TEXT;

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "CNR",
ADD COLUMN     "CRN" INTEGER;
