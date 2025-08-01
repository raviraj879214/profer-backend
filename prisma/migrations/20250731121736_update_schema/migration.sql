-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_prosId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "prosId" SET DATA TYPE TEXT;
