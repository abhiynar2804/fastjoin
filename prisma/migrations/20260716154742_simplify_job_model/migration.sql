/*
  Warnings:

  - You are about to drop the column `companyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `compensation` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `openings` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "companyId",
DROP COLUMN "compensation",
DROP COLUMN "openings",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";
