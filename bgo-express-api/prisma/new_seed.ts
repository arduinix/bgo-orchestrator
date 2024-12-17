import { PrismaClient, Prisma } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')
  const userData: Prisma.UserCreateInput[] = [
    {
      id: ulid(),
      email: 'user1@example.com',
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      ownedPlayer:
    },
    {
      id: ulid(),
      email: 'user2@example.com',
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      id: ulid(),
      email: 'user3@example.com',
      username: 'user3',
      firstName: 'Alice',
      lastName: 'Johnson',
    },
  ]

  for (const user of userData) {
    await prisma.user.create({
      data: user,
    })
  }

  const playerData: Prisma.PlayerCreateInput[] = [
    {
      id: ulid(),
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'player1@example.com',
      phoneNumber: '123-456-7890',
    },
    {
      id: ulid(),
      firstName: 'Serena',
      lastName: 'Williams',
      email: 'player2@example.com',
      phoneNumber: '987-654-3210',
    },
    {
      id: ulid(),
      firstName: 'LeBron',
      lastName: 'James',
      email: 'player3@example.com',
      phoneNumber: '456-789-1230',
    },
  ]

  for (const player of playerData) { 
    await prisma.player.create({
      data: player,
    })
  }
}

// player association (because a user can also be a player)

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
