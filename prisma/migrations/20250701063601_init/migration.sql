/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emails]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emails` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `emails` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_emails_key` ON `User`(`emails`);
