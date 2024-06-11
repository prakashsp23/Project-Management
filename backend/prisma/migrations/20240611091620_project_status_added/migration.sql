-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING_APPROVAL', 'REJECTED', 'COMPLETED', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING_APPROVAL';
