/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "startdate" TIMESTAMP(3),
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'active',
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "passwordresetlink" DROP NOT NULL;
