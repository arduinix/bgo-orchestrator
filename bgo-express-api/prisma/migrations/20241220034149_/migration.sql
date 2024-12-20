/*
  Warnings:

  - A unique constraint covering the columns `[email,ownedByUserId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_ownedByUserId_key" ON "Player"("email", "ownedByUserId");
