-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('Software', 'Hardware');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamLeaderId" TEXT NOT NULL,
    "problemStatement" TEXT,
    "githubLink" TEXT,
    "technologiesUsed" TEXT[],
    "projectType" "ProjectType" NOT NULL DEFAULT 'Software',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMember_AB_unique" ON "_TeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMember_B_index" ON "_TeamMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTeacher_AB_unique" ON "_ProjectToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTeacher_B_index" ON "_ProjectToTeacher"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamLeaderId_fkey" FOREIGN KEY ("teamLeaderId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTeacher" ADD CONSTRAINT "_ProjectToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTeacher" ADD CONSTRAINT "_ProjectToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
