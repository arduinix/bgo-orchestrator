/*
  Warnings:

  - A unique constraint covering the columns `[ownedByUserId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_ownedByUserId_key" ON "Player"("ownedByUserId");
