-- AlterTable
ALTER TABLE "Bid" ALTER COLUMN "proId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProBusinessDetails" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "maps" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "website" TEXT;
