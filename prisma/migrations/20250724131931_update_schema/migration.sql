-- AlterTable
ALTER TABLE "TempUser" ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "paymentintentid" TEXT,
ADD COLUMN     "startdate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;
