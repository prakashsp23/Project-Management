/*
  Warnings:

  - You are about to drop the column `profileId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `StudentToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId]` on the table `TeacherProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_profileId_fkey";

-- DropForeignKey
ALTER TABLE "StudentToken" DROP CONSTRAINT "StudentToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_profileId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherToken" DROP CONSTRAINT "TeacherToken_userId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "CNR" INTEGER,
ADD COLUMN     "URN" TEXT,
ADD COLUMN     "branch" TEXT,
ADD COLUMN     "graduationDate" TIMESTAMP(3),
ADD COLUMN     "semester" INTEGER,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentToken";

-- DropTable
DROP TABLE "TeacherToken";

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_teacherId_key" ON "TeacherProfile"("teacherId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
