/*
  Warnings:

  - You are about to drop the `_ProjectToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTeacher" DROP CONSTRAINT "_ProjectToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTeacher" DROP CONSTRAINT "_ProjectToTeacher_B_fkey";

-- DropTable
DROP TABLE "_ProjectToTeacher";

-- CreateTable
CREATE TABLE "_Mentors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TA" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Mentors_AB_unique" ON "_Mentors"("A", "B");

-- CreateIndex
CREATE INDEX "_Mentors_B_index" ON "_Mentors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TA_AB_unique" ON "_TA"("A", "B");

-- CreateIndex
CREATE INDEX "_TA_B_index" ON "_TA"("B");

-- AddForeignKey
ALTER TABLE "_Mentors" ADD CONSTRAINT "_Mentors_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Mentors" ADD CONSTRAINT "_Mentors_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TA" ADD CONSTRAINT "_TA_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TA" ADD CONSTRAINT "_TA_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
