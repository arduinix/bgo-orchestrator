/*
  Warnings:

  - You are about to drop the column `invitedTimestamp` on the `EventPlayerInvitation` table. All the data in the column will be lost.
  - The primary key for the `UserPlayerAssociation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `UserPlayerAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPlayerAssociation` table. All the data in the column will be lost.
  - Added the required column `playerEmail` to the `UserPlayerAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `UserPlayerAssociation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_playerId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_userId_fkey";

-- AlterTable
ALTER TABLE "EventPlayerGroup" ADD COLUMN     "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EventPlayerInvitation" DROP COLUMN "invitedTimestamp",
ADD COLUMN     "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_pkey",
DROP COLUMN "playerId",
DROP COLUMN "userId",
ADD COLUMN     "playerEmail" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD CONSTRAINT "UserPlayerAssociation_pkey" PRIMARY KEY ("userEmail", "playerEmail");

-- CreateTable
CREATE TABLE "EventPlayerParticipationStatus" (
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initialCheckedInTimestamp" TIMESTAMP(3),
    "isCheckedIn" BOOLEAN NOT NULL DEFAULT false,
    "isPlaying" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventPlayerParticipationStatus_pkey" PRIMARY KEY ("eventId","playerId")
);

-- CreateTable
CREATE TABLE "EventGameCategory" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isInPlay" BOOLEAN NOT NULL DEFAULT true,
    "eventId" TEXT,

    CONSTRAINT "EventGameCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventGame" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isInPlay" BOOLEAN NOT NULL DEFAULT true,
    "eventGameCategoryId" TEXT,

    CONSTRAINT "EventGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventGameCategory_id_key" ON "EventGameCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventGameCategory_name_key" ON "EventGameCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EventGame_id_key" ON "EventGame"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventGame_name_key" ON "EventGame"("name");

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_playerEmail_fkey" FOREIGN KEY ("playerEmail") REFERENCES "Player"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerParticipationStatus" ADD CONSTRAINT "EventPlayerParticipationStatus_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerParticipationStatus" ADD CONSTRAINT "EventPlayerParticipationStatus_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGameCategory" ADD CONSTRAINT "EventGameCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGame" ADD CONSTRAINT "EventGame_eventGameCategoryId_fkey" FOREIGN KEY ("eventGameCategoryId") REFERENCES "EventGameCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
