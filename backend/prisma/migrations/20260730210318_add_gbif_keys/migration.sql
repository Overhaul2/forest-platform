/*
  Warnings:

  - A unique constraint covering the columns `[gbifKey]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gbifKey]` on the table `Genus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gbifKey]` on the table `Kingdom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gbifKey]` on the table `TaxonomicClass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gbifKey]` on the table `TaxonomicOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "gbifKey" INTEGER;

-- AlterTable
ALTER TABLE "Genus" ADD COLUMN     "gbifKey" INTEGER;

-- AlterTable
ALTER TABLE "Kingdom" ADD COLUMN     "gbifKey" INTEGER;

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "gbifDataset" TEXT,
ADD COLUMN     "isSynced" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastSyncAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TaxonomicClass" ADD COLUMN     "gbifKey" INTEGER;

-- AlterTable
ALTER TABLE "TaxonomicOrder" ADD COLUMN     "gbifKey" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Family_gbifKey_key" ON "Family"("gbifKey");

-- CreateIndex
CREATE UNIQUE INDEX "Genus_gbifKey_key" ON "Genus"("gbifKey");

-- CreateIndex
CREATE UNIQUE INDEX "Kingdom_gbifKey_key" ON "Kingdom"("gbifKey");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomicClass_gbifKey_key" ON "TaxonomicClass"("gbifKey");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomicOrder_gbifKey_key" ON "TaxonomicOrder"("gbifKey");
