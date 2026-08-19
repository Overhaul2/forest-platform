/*
  Warnings:

  - A unique constraint covering the columns `[gbifIdentifier]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gbifIdentifier` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creator" TEXT,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "gbifIdentifier" TEXT NOT NULL,
ADD COLUMN     "license" TEXT,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "references" TEXT,
ADD COLUMN     "rightsHolder" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "source" SET DEFAULT 'GBIF';

-- CreateIndex
CREATE UNIQUE INDEX "Image_gbifIdentifier_key" ON "Image"("gbifIdentifier");
