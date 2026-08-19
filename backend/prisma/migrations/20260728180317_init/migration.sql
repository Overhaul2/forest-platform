-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'RESEARCHER', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kingdom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kingdom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phylum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kingdomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phylum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxonomicClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phylumId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxonomicClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxonomicOrder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxonomicOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "gbifId" INTEGER,
    "wikidataId" TEXT,
    "scientificName" TEXT NOT NULL,
    "canonicalName" TEXT,
    "scientificAuthor" TEXT,
    "rank" TEXT,
    "description" TEXT,
    "heightMin" DOUBLE PRECISION,
    "heightMax" DOUBLE PRECISION,
    "diameterMin" DOUBLE PRECISION,
    "diameterMax" DOUBLE PRECISION,
    "woodDensity" DOUBLE PRECISION,
    "distribution" TEXT,
    "floweringPeriod" TEXT,
    "fruitingPeriod" TEXT,
    "genusId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VernacularName" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT,
    "name" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,

    CONSTRAINT "VernacularName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Synonym" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,

    CONSTRAINT "Synonym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" TEXT,
    "copyright" TEXT,
    "speciesId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesHabitat" (
    "speciesId" TEXT NOT NULL,
    "habitatId" TEXT NOT NULL,

    CONSTRAINT "SpeciesHabitat_pkey" PRIMARY KEY ("speciesId","habitatId")
);

-- CreateTable
CREATE TABLE "Use" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Use_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesUse" (
    "speciesId" TEXT NOT NULL,
    "useId" TEXT NOT NULL,

    CONSTRAINT "SpeciesUse_pkey" PRIMARY KEY ("speciesId","useId")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" TEXT NOT NULL,
    "gbifOccurrenceId" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locality" TEXT,
    "observedAt" TIMESTAMP(3),
    "speciesId" TEXT NOT NULL,
    "countryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "source" TEXT,
    "speciesId" TEXT NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecogfGroup" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RecogfGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesRecogf" (
    "speciesId" TEXT NOT NULL,
    "recogfId" TEXT NOT NULL,

    CONSTRAINT "SpeciesRecogf_pkey" PRIMARY KEY ("speciesId","recogfId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kingdom_name_key" ON "Kingdom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phylum_name_key" ON "Phylum"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomicClass_name_key" ON "TaxonomicClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TaxonomicOrder_name_key" ON "TaxonomicOrder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Family_name_key" ON "Family"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genus_name_key" ON "Genus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Species_gbifId_key" ON "Species"("gbifId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_wikidataId_key" ON "Species"("wikidataId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_scientificName_key" ON "Species"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "VernacularName_speciesId_language_name_key" ON "VernacularName"("speciesId", "language", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Habitat_name_key" ON "Habitat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Use_name_key" ON "Use"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecogfGroup_code_key" ON "RecogfGroup"("code");

-- AddForeignKey
ALTER TABLE "Phylum" ADD CONSTRAINT "Phylum_kingdomId_fkey" FOREIGN KEY ("kingdomId") REFERENCES "Kingdom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxonomicClass" ADD CONSTRAINT "TaxonomicClass_phylumId_fkey" FOREIGN KEY ("phylumId") REFERENCES "Phylum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxonomicOrder" ADD CONSTRAINT "TaxonomicOrder_classId_fkey" FOREIGN KEY ("classId") REFERENCES "TaxonomicClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "TaxonomicOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genus" ADD CONSTRAINT "Genus_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "Genus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VernacularName" ADD CONSTRAINT "VernacularName_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesHabitat" ADD CONSTRAINT "SpeciesHabitat_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesHabitat" ADD CONSTRAINT "SpeciesHabitat_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesUse" ADD CONSTRAINT "SpeciesUse_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesUse" ADD CONSTRAINT "SpeciesUse_useId_fkey" FOREIGN KEY ("useId") REFERENCES "Use"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesRecogf" ADD CONSTRAINT "SpeciesRecogf_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesRecogf" ADD CONSTRAINT "SpeciesRecogf_recogfId_fkey" FOREIGN KEY ("recogfId") REFERENCES "RecogfGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
