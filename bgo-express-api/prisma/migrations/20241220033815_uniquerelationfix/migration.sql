/*
  Warnings:

  - The primary key for the `UserPlayerAssociation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerEmail` on the `UserPlayerAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `UserPlayerAssociation` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `UserPlayerAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPlayerAssociation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_playerEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_userEmail_fkey";

-- DropIndex
DROP INDEX "Player_email_key";

-- DropIndex
DROP INDEX "Player_ownedByUserId_key";

-- AlterTable
ALTER TABLE "UserPlayerAssociation" DROP CONSTRAINT "UserPlayerAssociation_pkey",
DROP COLUMN "playerEmail",
DROP COLUMN "userEmail",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserPlayerAssociation_pkey" PRIMARY KEY ("userId", "playerId");

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
