/*
  Warnings:

  - You are about to drop the `_TA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TA" DROP CONSTRAINT "_TA_A_fkey";

-- DropForeignKey
ALTER TABLE "_TA" DROP CONSTRAINT "_TA_B_fkey";

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "_TA";

-- CreateTable
CREATE TABLE "_CC" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CC_AB_unique" ON "_CC"("A", "B");

-- CreateIndex
CREATE INDEX "_CC_B_index" ON "_CC"("B");

-- AddForeignKey
ALTER TABLE "_CC" ADD CONSTRAINT "_CC_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CC" ADD CONSTRAINT "_CC_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
