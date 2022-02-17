/*
  Warnings:

  - You are about to drop the column `validSeconds` on the `Survey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "validSeconds",
ADD COLUMN     "limit" INTEGER NOT NULL DEFAULT 10;
