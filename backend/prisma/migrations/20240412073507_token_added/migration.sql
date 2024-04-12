/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `StudentProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Teacher` table. All the data in the column will be lost.
  - The primary key for the `TeacherProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `userId` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `userId` was added to the `Teacher` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_profileId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StudentProfile_id_seq";

-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "TeacherProfile" DROP CONSTRAINT "TeacherProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeacherProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TeacherProfile_id_seq";

-- CreateTable
CREATE TABLE "StudentToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "StudentToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "TeacherToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "StudentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "TeacherProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentToken" ADD CONSTRAINT "StudentToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Student"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherToken" ADD CONSTRAINT "TeacherToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
