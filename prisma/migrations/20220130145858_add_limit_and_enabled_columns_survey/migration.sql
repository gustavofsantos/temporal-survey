-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "limit" INTEGER NOT NULL DEFAULT 100;