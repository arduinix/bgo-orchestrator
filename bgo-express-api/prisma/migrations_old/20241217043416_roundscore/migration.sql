-- CreateEnum
CREATE TYPE "RoundPhase" AS ENUM ('SETUP', 'READY', 'PLAYING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ScoreMedal" AS ENUM ('GOLD', 'SILVER', 'BRONZE', 'NONE');

-- AlterTable
ALTER TABLE "EventGame" ADD COLUMN     "lowScoreWins" BOOLEAN NOT NULL DEFAULT false;

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

-- CreateIndex
CREATE UNIQUE INDEX "Round_id_key" ON "Round"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_id_key" ON "MatchPlayer"("id");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "EventGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
