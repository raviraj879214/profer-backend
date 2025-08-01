/*
  Warnings:

  - You are about to drop the column `filename` on the `ProjectFile` table. All the data in the column will be lost.
  - Added the required column `originalName` to the `ProjectFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectFile" DROP COLUMN "filename",
ADD COLUMN     "originalName" TEXT NOT NULL;
