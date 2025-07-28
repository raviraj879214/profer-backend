-- CreateTable
CREATE TABLE "ProBusinessDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "zip" TEXT NOT NULL,
    "ein" TEXT NOT NULL,
    "ownerFirstName" TEXT NOT NULL,
    "ownerLastName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "services" TEXT[],
    "qualifications" TEXT[],
    "companyLogo" TEXT NOT NULL,
    "ownerLicense" TEXT NOT NULL,
    "agreeTerms" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProBusinessDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProBusinessDetails_userId_key" ON "ProBusinessDetails"("userId");

-- AddForeignKey
ALTER TABLE "ProBusinessDetails" ADD CONSTRAINT "ProBusinessDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
