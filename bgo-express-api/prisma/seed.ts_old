import { PrismaClient, Prisma } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      id: ulid(),
      email: 'user1@example.com',
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      id: ulid(),
      email: 'user2@example.com',
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  })

  // Create Players
  const player1 = await prisma.player.create({
    data: {
      id: ulid(),
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'player1@example.com',
      phoneNumber: '123-456-7890',
      age: 25,
    },
  })

  const player2 = await prisma.player.create({
    data: {
      id: ulid(),
      firstName: 'Serena',
      lastName: 'Williams',
      email: 'player2@example.com',
      phoneNumber: '987-654-3210',
      age: 29,
    },
  })

  // Associate User and Player
  await prisma.userPlayerAssociation.create({
    data: {
      userEmail: user1.email,
      playerEmail: player1.email,
    },
  })

  // Create Event
  const event1 = await prisma.event.create({
    data: {
      id: ulid(),
      name: 'Summer Tournament',
      description: 'A fun summer sports tournament',
      proposedDatetime: new Date(),
      location: 'Sports Arena',
      imagePath: '/images/event1.png',
      eventPlayerGroup: {
        create: {
          id: ulid(),
          players: { connect: [{ id: player1.id }, { id: player2.id }] },
        },
      },
    },
    include: { eventPlayerGroup: true },
  })

  // Assign Entitlements
  await prisma.userEventEntitlement.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      role: 'OWNER',
      assignedBy: 'admin',
    },
  })

  await prisma.userEventEntitlement.create({
    data: {
      userId: user2.id,
      eventId: event1.id,
      role: 'VIEWER',
      assignedBy: 'admin',
    },
  })

  // Create Event Game Categories and Games
  const gameCategory = await prisma.eventGameCategory.create({
    data: {
      id: ulid(),
      name: 'Basketball',
      description: 'Basketball category',
      eventId: event1.id,
    },
  })

  await prisma.eventGame.create({
    data: {
      id: ulid(),
      name: 'Three-Point Contest',
      description: 'Test your three-point shooting skills!',
      eventGameCategoryId: gameCategory.id,
    },
  })

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
