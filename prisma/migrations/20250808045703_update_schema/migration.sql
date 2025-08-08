-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_userId_fkey";

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
