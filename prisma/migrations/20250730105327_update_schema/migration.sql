-- CreateTable
CREATE TABLE "Cms" (
    "CmsID" SERIAL NOT NULL,
    "CmsPageName" TEXT NOT NULL,
    "CmsText" TEXT NOT NULL,

    CONSTRAINT "Cms_pkey" PRIMARY KEY ("CmsID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cms_CmsPageName_key" ON "Cms"("CmsPageName");
