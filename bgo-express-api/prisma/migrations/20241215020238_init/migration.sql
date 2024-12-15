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

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
