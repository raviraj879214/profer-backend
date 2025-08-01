/*
  Warnings:

  - You are about to drop the column `address` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `buildingAge` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedBudget` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrls` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `preferredContact` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `preferredStartDate` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `problemDescription` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `propertySize` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `roofType` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `serviceNeeded` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `RoofingRequest` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `RoofingRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoofingRequest" DROP COLUMN "address",
DROP COLUMN "buildingAge",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "estimatedBudget",
DROP COLUMN "phone",
DROP COLUMN "photoUrls",
DROP COLUMN "preferredContact",
DROP COLUMN "preferredStartDate",
DROP COLUMN "problemDescription",
DROP COLUMN "propertySize",
DROP COLUMN "propertyType",
DROP COLUMN "roofType",
DROP COLUMN "serviceNeeded",
DROP COLUMN "state",
DROP COLUMN "updatedAt",
DROP COLUMN "urgency",
DROP COLUMN "zipCode",
ADD COLUMN     "emailAddress" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "preferredCallingTime" TEXT,
ADD COLUMN     "preferredContactMethod" TEXT,
ADD COLUMN     "productColor" TEXT,
ADD COLUMN     "productPreference" TEXT,
ADD COLUMN     "productType" TEXT,
ADD COLUMN     "projectAddress" TEXT,
ADD COLUMN     "projectDetails" TEXT,
ADD COLUMN     "projectTitle" TEXT,
ADD COLUMN     "workDescription" TEXT;

-- CreateTable
CREATE TABLE "ProjectFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "projectRequestId" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectRequestId_fkey" FOREIGN KEY ("projectRequestId") REFERENCES "RoofingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
