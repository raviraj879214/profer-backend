/*
  Warnings:

  - You are about to drop the column `agreeTerms` on the `ProBusinessDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProBusinessDetails" DROP COLUMN "agreeTerms",
ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "companyPhone" DROP NOT NULL,
ALTER COLUMN "companyEmail" DROP NOT NULL,
ALTER COLUMN "streetAddress" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zip" DROP NOT NULL,
ALTER COLUMN "ein" DROP NOT NULL,
ALTER COLUMN "ownerFirstName" DROP NOT NULL,
ALTER COLUMN "ownerLastName" DROP NOT NULL,
ALTER COLUMN "ownerEmail" DROP NOT NULL;
