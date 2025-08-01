-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "phoneNumber" TEXT,
    "emailAddress" TEXT,
    "projectTitle" TEXT,
    "projectAddress" TEXT,
    "projectDetails" TEXT,
    "productType" TEXT,
    "productColor" TEXT,
    "productPreference" TEXT,
    "workDescription" TEXT,
    "budget" DOUBLE PRECISION,
    "status" INTEGER NOT NULL DEFAULT 0,
    "prosId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDocument" (
    "id" SERIAL NOT NULL,
    "fileType" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDocument" ADD CONSTRAINT "ProjectDocument_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
