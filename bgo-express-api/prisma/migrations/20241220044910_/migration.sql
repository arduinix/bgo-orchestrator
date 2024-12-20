/*
  Warnings:

  - Added the required column `maxPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "averagePlayTime" INTEGER,
ADD COLUMN     "maxPlayers" INTEGER NOT NULL,
ADD COLUMN     "minPlayers" INTEGER NOT NULL;
