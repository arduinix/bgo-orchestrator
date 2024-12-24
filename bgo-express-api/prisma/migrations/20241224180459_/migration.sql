/*
  Warnings:

  - You are about to drop the column `eventGameCategory` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `eventGameId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_eventGameCategory_eventGameId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "eventGameCategory",
DROP COLUMN "eventGameId",
DROP COLUMN "gameId";
