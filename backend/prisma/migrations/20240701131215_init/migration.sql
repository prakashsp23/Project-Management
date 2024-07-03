-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'REGULAR');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING_APPROVAL', 'REJECTED', 'COMPLETED', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('Software', 'Hardware');

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastSignedIn" TIMESTAMP(3),
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL,
    "lastSignedIn" TIMESTAMP(3),
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "semester" INTEGER,
    "branch" TEXT,
    "graduationDate" TIMESTAMP(3),
    "CRN" INTEGER,
    "URN" TEXT,
    "studentId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "problemsSolved" TEXT,
    "requirements" TEXT[],
    "teamLeaderId" TEXT NOT NULL,
    "problemStatement" TEXT,
    "githubLink" TEXT,
    "technologiesUsed" TEXT[],
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
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
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_teacherId_key" ON "TeacherProfile"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMember_AB_unique" ON "_TeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMember_B_index" ON "_TeamMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Mentors_AB_unique" ON "_Mentors"("A", "B");

-- CreateIndex
CREATE INDEX "_Mentors_B_index" ON "_Mentors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TA_AB_unique" ON "_TA"("A", "B");

-- CreateIndex
CREATE INDEX "_TA_B_index" ON "_TA"("B");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamLeaderId_fkey" FOREIGN KEY ("teamLeaderId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMember" ADD CONSTRAINT "_TeamMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Mentors" ADD CONSTRAINT "_Mentors_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Mentors" ADD CONSTRAINT "_Mentors_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TA" ADD CONSTRAINT "_TA_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TA" ADD CONSTRAINT "_TA_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
