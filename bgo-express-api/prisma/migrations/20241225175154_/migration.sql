-- AlterTable
ALTER TABLE "EventPlayerParticipation" ADD COLUMN     "teamId" TEXT;

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRoundRepresentative" (
    "roundId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "eventPlayerSlotId" TEXT NOT NULL,
    "createdTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamRoundRepresentative_pkey" PRIMARY KEY ("roundId","teamId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoundRepresentative_eventPlayerSlotId_key" ON "TeamRoundRepresentative"("eventPlayerSlotId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoundRepresentative" ADD CONSTRAINT "TeamRoundRepresentative_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoundRepresentative" ADD CONSTRAINT "TeamRoundRepresentative_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoundRepresentative" ADD CONSTRAINT "TeamRoundRepresentative_eventPlayerSlotId_fkey" FOREIGN KEY ("eventPlayerSlotId") REFERENCES "EventMatchPlayerSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPlayerParticipation" ADD CONSTRAINT "EventPlayerParticipation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
