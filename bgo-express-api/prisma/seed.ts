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
    },
    {
      id: ulid(),
      email: 'user2@example.com',
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Doe',
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
      firstName: 'Sassy',
      lastName: 'Lassie',
      email: 'player1@example.com',
      phoneNumber: '123-456-7890',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      firstName: 'Fancy',
      lastName: 'Pants',
      email: 'player2@example.com',
      phoneNumber: '123-456-7810',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      firstName: 'Rudolph',
      lastName: 'Reindeer',
      email: 'player3@example.com',
      phoneNumber: '123-456-7810',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      firstName: 'Santa',
      lastName: 'Claus',
      email: 'santa.claus@northpole.com',
      phoneNumber: '123-456-7810',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      firstName: 'Master',
      lastName: 'Splinter',
      email: 'player2@example.com',
      phoneNumber: '123-456-7810',
      ownedByUser: {
        connect: { id: userData[1].id },
      },
    },
    {
      id: ulid(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'user1@example.com',
      phoneNumber: '123-456-7890',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
  ]

  for (const player of playerData) {
    await prisma.player.create({
      data: player,
    })
  }

  const userPlayerAssociationData: Prisma.UserPlayerAssociationCreateInput[] = [
    {
      user: {
        connect: { id: userData[0].id },
      },
      player: {
        connect: { id: playerData[0].id },
      },
    },
  ]

  for (const userPlayerAssociation of userPlayerAssociationData) {
    await prisma.userPlayerAssociation.create({
      data: userPlayerAssociation,
    })
  }

  const playerGroupData: Prisma.EventPlayerGroupCreateInput[] = [
    {
      id: ulid(),
      players: {
        connect: [
          { id: playerData[0].id },
          { id: playerData[1].id },
          { id: playerData[2].id },
          { id: playerData[3].id },
        ],
      },
    },
    {
      id: ulid(),
      // players: {
      //   connect: [
      //     { id: playerData[0].id },
      //     { id: playerData[1].id },
      //     { id: playerData[2].id },
      //     { id: playerData[3].id },
      //   ],
      // },
    },
  ]

  for (const playerGroup of playerGroupData) {
    await prisma.eventPlayerGroup.create({
      data: playerGroup,
    })
  }

  const eventData: Prisma.EventCreateInput[] = [
    {
      id: ulid(),
      name: 'Spring 2025',
      description: 'BGO Spring 2025',
      proposedDatetime: new Date('2025-03-01T00:00:00Z'),
      location: 'Dormont, PA',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
      eventPlayerGroup: {
        connect: { id: playerGroupData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Fall 2025',
      description: 'BGO Fall 2025',
      proposedDatetime: new Date('2025-03-01T00:00:00Z'),
      location: 'Dormont, PA',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
      eventPlayerGroup: {
        connect: { id: playerGroupData[1].id },
      },
    },
  ]

  for (const event of eventData) {
    await prisma.event.create({
      data: event,
    })
  }
  const userEventEntitlementData: Prisma.UserEventEntitlementCreateInput[] = [
    {
      user: {
        connect: { id: userData[0].id },
      },
      event: {
        connect: { id: eventData[0].id },
      },
      role: 'OWNER',
      assignedBy: 'SYSTEM',
    },
    {
      user: {
        connect: { id: userData[1].id },
      },
      event: {
        connect: { id: eventData[0].id },
      },
      role: 'EDITOR',
      assignedBy: 'SYSTEM',
    },
  ]

  for (const userEventEntitlement of userEventEntitlementData) {
    await prisma.userEventEntitlement.create({
      data: userEventEntitlement,
    })
  }

  const gameData: Prisma.GameCreateInput[] = [
    {
      id: ulid(),
      name: 'Ticket to Ride',
      description:
        'Ticket to Ride is a cross-country train adventure in which players collect and play matching train cards to claim railway routes connecting cities throughout North America.',
      minPlayers: 2,
      maxPlayers: 5,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Catan',
      description:
        'Catan is a game of trading and building where players collect resources and use them to build roads, settlements, and cities to earn points.',
      minPlayers: 3,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Pandemic',
      description:
        'Pandemic is a cooperative game where players work together to stop the spread of diseases and find cures before time runs out.',
      minPlayers: 2,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Carcassonne',
      description:
        'Carcassonne is a tile-placement game where players build cities, roads, and fields to score points.',
      minPlayers: 2,
      maxPlayers: 5,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: '7 Wonders',
      description:
        '7 Wonders is a card drafting game where players build structures and wonders to earn points over three ages.',
      minPlayers: 3,
      maxPlayers: 7,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Dominion',
      description:
        'Dominion is a deck-building game where players use cards to build their deck and earn points.',
      minPlayers: 2,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Splendor',
      description:
        'Splendor is a game of chip-collecting and card development where players use gems to buy cards and earn points.',
      minPlayers: 2,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Azul',
      description:
        'Azul is a tile-placement game where players draft tiles to complete patterns and score points.',
      minPlayers: 2,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Terraforming Mars',
      description:
        'Terraforming Mars is a game where players work to terraform the planet Mars by raising the temperature, creating oceans, and building greenery.',
      minPlayers: 1,
      maxPlayers: 5,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      name: 'Gloomhaven',
      description:
        'Gloomhaven is a cooperative game of tactical combat in a persistent world of shifting motives.',
      minPlayers: 1,
      maxPlayers: 4,
      lowScoreWins: false,
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
  ]

  for (const game of gameData) {
    await prisma.game.create({
      data: game,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
