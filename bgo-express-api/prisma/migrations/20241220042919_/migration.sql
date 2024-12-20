-- CreateEnum
CREATE TYPE "UserEntitlementRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "EventPlayerInvitationResponseStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- CreateEnum
CREATE TYPE "RoundPhase" AS ENUM ('SETUP', 'READY', 'PLAYING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ScoreMedal" AS ENUM ('GOLD', 'SILVER', 'BRONZE', 'NONE');

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
    "role" "UserEntitlementRole" NOT NULL,
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
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "proposedDatetime" TIMESTAMP(3),
    "location" TEXT,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playedTimestamp" TIMESTAMP(3),
    "imagePath" TEXT,
    "eventPlayerGroupId" TEXT NOT NULL,
    "ownedByUserId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownedByUserId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPlayerGroup" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventPlayerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPlayerInvitation" (
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedTimestamp" TIMESTAMP(3),
    "responseStatus" "EventPlayerInvitationResponseStatus" NOT NULL DEFAULT 'PENDING',
    "responseMessage" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EventPlayerInvitation_pkey" PRIMARY KEY ("eventId","playerId")
);

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
    "eventGameCategoryId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isInPlay" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EventGame_pkey" PRIMARY KEY ("eventGameCategoryId","gameId")
);

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

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedTimestamp" TIMESTAMP(3),
    "completedTimestamp" TIMESTAMP(3),
    "eventId" TEXT NOT NULL,
    "phase" "RoundPhase" NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedTimestamp" TIMESTAMP(3),
    "completedTimestamp" TIMESTAMP(3),
    "roundId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "eventGameCategory" TEXT NOT NULL,
    "eventGameId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "recordedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isWinningScore" BOOLEAN NOT NULL,
    "medal" "ScoreMedal" NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("matchId","playerId")
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
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventPlayerGroupId_key" ON "Event"("eventPlayerGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_ownedByUserId_key" ON "Event"("ownedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_ownedByUserId_key" ON "Player"("email", "ownedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "EventPlayerGroup_id_key" ON "EventPlayerGroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventGameCategory_id_key" ON "EventGameCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventGameCategory_name_key" ON "EventGameCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_ownedByUserId_key" ON "Game"("ownedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_id_key" ON "Round"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_id_key" ON "MatchPlayer"("id");

-- CreateIndex
CREATE INDEX "_EventPlayerGroupToPlayer_B_index" ON "_EventPlayerGroupToPlayer"("B");

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
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerInvitation" ADD CONSTRAINT "EventPlayerInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerParticipationStatus" ADD CONSTRAINT "EventPlayerParticipationStatus_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerParticipationStatus" ADD CONSTRAINT "EventPlayerParticipationStatus_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGameCategory" ADD CONSTRAINT "EventGameCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGame" ADD CONSTRAINT "EventGame_eventGameCategoryId_fkey" FOREIGN KEY ("eventGameCategoryId") REFERENCES "EventGameCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGame" ADD CONSTRAINT "EventGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_eventGameCategory_eventGameId_fkey" FOREIGN KEY ("eventGameCategory", "eventGameId") REFERENCES "EventGame"("eventGameCategoryId", "gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPlayerGroupToPlayer" ADD CONSTRAINT "_EventPlayerGroupToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "EventPlayerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPlayerGroupToPlayer" ADD CONSTRAINT "_EventPlayerGroupToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
