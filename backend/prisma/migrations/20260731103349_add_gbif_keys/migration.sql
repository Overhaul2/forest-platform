/*
  Warnings:

  - A unique constraint covering the columns `[gbifKey]` on the table `Phylum` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Phylum" ADD COLUMN     "gbifKey" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Phylum_gbifKey_key" ON "Phylum"("gbifKey");
