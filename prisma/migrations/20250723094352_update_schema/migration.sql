-- CreateTable
CREATE TABLE "RoofingRequest" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredContact" TEXT,
    "propertyType" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "propertySize" TEXT,
    "buildingAge" INTEGER,
    "serviceNeeded" TEXT NOT NULL,
    "roofType" TEXT,
    "problemDescription" TEXT,
    "urgency" TEXT,
    "estimatedBudget" TEXT,
    "preferredStartDate" TIMESTAMP(3),
    "photoUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoofingRequest_pkey" PRIMARY KEY ("id")
);
