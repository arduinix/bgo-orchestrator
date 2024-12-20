/*
  Warnings:

  - The primary key for the `EventGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `EventGame` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `EventGame` table. All the data in the column will be lost.
  - You are about to drop the column `lowScoreWins` on the `EventGame` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EventGame` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownedByUserId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownedByUserId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `EventGame` table without a default value. This is not possible if the table is not empty.
  - Made the column `eventGameCategoryId` on table `EventGame` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `eventGameCategory` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventGameId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownedByUserId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `UserEventEntitlement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserEntitlementRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "EventGame" DROP CONSTRAINT "EventGame_eventGameCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_gameId_fkey";

-- DropIndex
DROP INDEX "EventGame_id_key";

-- DropIndex
DROP INDEX "EventGame_name_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "ownedByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventGame" DROP CONSTRAINT "EventGame_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "lowScoreWins",
DROP COLUMN "name",
ADD COLUMN     "gameId" TEXT NOT NULL,
ALTER COLUMN "eventGameCategoryId" SET NOT NULL,
ADD CONSTRAINT "EventGame_pkey" PRIMARY KEY ("eventGameCategoryId", "gameId");

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "eventGameCategory" TEXT NOT NULL,
ADD COLUMN     "eventGameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "age",
ADD COLUMN     "ownedByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserEventEntitlement" DROP COLUMN "role",
ADD COLUMN     "role" "UserEntitlementRole" NOT NULL;

-- DropEnum
DROP TYPE "UserEventEntitlementRole";

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lowScoreWins" BOOLEAN NOT NULL DEFAULT false,
    "ownedByUserId" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_ownedByUserId_key" ON "Game"("ownedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_ownedByUserId_key" ON "Event"("ownedByUserId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGame" ADD CONSTRAINT "EventGame_eventGameCategoryId_fkey" FOREIGN KEY ("eventGameCategoryId") REFERENCES "EventGameCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGame" ADD CONSTRAINT "EventGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_eventGameCategory_eventGameId_fkey" FOREIGN KEY ("eventGameCategory", "eventGameId") REFERENCES "EventGame"("eventGameCategoryId", "gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
