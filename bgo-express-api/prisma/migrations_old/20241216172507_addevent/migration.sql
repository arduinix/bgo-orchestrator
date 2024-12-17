/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventPlayerGroupId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventPlayerGroupId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserEventEntitlementRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "EventPlayerInvitationResponseStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventPlayerGroupId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEventEntitlement" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "role" "UserEventEntitlementRole" NOT NULL,
    "assignedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserEventEntitlement_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "UserPlayerAssociation" (
    "userId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPlayerAssociation_pkey" PRIMARY KEY ("userId","playerId")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "age" INTEGER,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPlayerGroup" (
    "id" TEXT NOT NULL,

    CONSTRAINT "EventPlayerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPlayerInvitation" (
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "invitedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedTimestamp" TIMESTAMP(3),
    "responseStatus" "EventPlayerInvitationResponseStatus" NOT NULL DEFAULT 'PENDING',
    "responseMessage" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EventPlayerInvitation_pkey" PRIMARY KEY ("eventId","playerId")
);

-- CreateTable
CREATE TABLE "_EventPlayerGroupToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventPlayerGroupToPlayer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventPlayerGroup_id_key" ON "EventPlayerGroup"("id");

-- CreateIndex
CREATE INDEX "_EventPlayerGroupToPlayer_B_index" ON "_EventPlayerGroupToPlayer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventPlayerGroupId_key" ON "Event"("eventPlayerGroupId");

-- AddForeignKey
ALTER TABLE "UserEventEntitlement" ADD CONSTRAINT "UserEventEntitlement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEventEntitlement" ADD CONSTRAINT "UserEventEntitlement_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayerAssociation" ADD CONSTRAINT "UserPlayerAssociation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventPlayerGroupId_fkey" FOREIGN KEY ("eventPlayerGroupId") REFERENCES "EventPlayerGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPlayerGroupToPlayer" ADD CONSTRAINT "_EventPlayerGroupToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "EventPlayerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPlayerGroupToPlayer" ADD CONSTRAINT "_EventPlayerGroupToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
