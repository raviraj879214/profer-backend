/*
  Warnings:

  - Made the column `companyName` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyPhone` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyEmail` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetAddress` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ein` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerFirstName` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerLastName` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerEmail` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agreeTerms` on table `ProBusinessDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProBusinessDetails" ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "companyPhone" SET NOT NULL,
ALTER COLUMN "companyEmail" SET NOT NULL,
ALTER COLUMN "streetAddress" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL,
ALTER COLUMN "ein" SET NOT NULL,
ALTER COLUMN "ownerFirstName" SET NOT NULL,
ALTER COLUMN "ownerLastName" SET NOT NULL,
ALTER COLUMN "ownerEmail" SET NOT NULL,
ALTER COLUMN "services" SET NOT NULL,
ALTER COLUMN "services" DROP DEFAULT,
ALTER COLUMN "services" SET DATA TYPE TEXT,
ALTER COLUMN "qualifications" SET NOT NULL,
ALTER COLUMN "qualifications" DROP DEFAULT,
ALTER COLUMN "qualifications" SET DATA TYPE TEXT,
ALTER COLUMN "agreeTerms" SET NOT NULL;
