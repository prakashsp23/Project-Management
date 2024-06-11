/*
  Warnings:

  - Added the required column `role` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'REGULAR');

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" "TeacherRole" NOT NULL;
