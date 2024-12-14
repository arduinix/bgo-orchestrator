-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");
