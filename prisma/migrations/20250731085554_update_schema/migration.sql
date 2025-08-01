/*
  Warnings:

  - Added the required column `fileType` to the `ProjectFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectFile" ADD COLUMN     "fileType" TEXT NOT NULL;
