-- DropForeignKey
ALTER TABLE "ProBusinessDetails" DROP CONSTRAINT "ProBusinessDetails_userId_fkey";

-- AddForeignKey
ALTER TABLE "ProBusinessDetails" ADD CONSTRAINT "ProBusinessDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
