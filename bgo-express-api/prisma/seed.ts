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
    {
      id: ulid(),
      firstName: 'Sarah',
      lastName: 'Connor',
      email: 'sc@example.com',
      phoneNumber: '123-456-7890',
      ownedByUser: {
        connect: { id: userData[0].id },
      },
    },
    {
      id: ulid(),
      firstName: 'Barry',
      lastName: 'Weiss',
      email: 'bw@example.com',
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
    {
      id: ulid(),
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
      eventConfigParameters: {
        create: {
          id: ulid(),
        },
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
    {
      id: ulid(),
      name: 'Fall 2025',
      description: 'Not My BGO Fall 2025',
      proposedDatetime: new Date('2025-03-01T00:00:00Z'),
      location: 'Dormont, PA',
      ownedByUser: {
        connect: { id: userData[1].id },
      },
      eventPlayerGroup: {
        connect: { id: playerGroupData[2].id },
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

  const eventGameCategoryData: Prisma.EventGameCategoryCreateInput[] = [
    {
      id: ulid(),
      name: 'Trick Taking',
      description: 'Games where players take turns playing cards to win tricks.',
    },
    {
      id: ulid(),
      name: 'Deck Building',
      description: 'Games where players build their deck of cards to win.',
    },
    {
      id: ulid(),
      name: 'Tile Placement',
      description: 'Games where players place tiles to score points.',
    },
    {
      id: ulid(),
      name: 'Cooperative',
      description: 'Games where players work together to achieve a common goal.',
    },
    {
      id: ulid(),
      name: 'Competitive',
      description: 'Games where players compete against each other to win.',
    },
  ]

  for (const eventGameCategory of eventGameCategoryData) {
    await prisma.eventGameCategory.create({
      data: eventGameCategory,
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

  const eventGameData: Prisma.EventGameCreateInput[] = [
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[0].id },
      },
      game: {
        connect: { id: gameData[0].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[1].id },
      },
      game: {
        connect: { id: gameData[1].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[2].id },
      },
      game: {
        connect: { id: gameData[2].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[3].id },
      },
      game: {
        connect: { id: gameData[3].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[4].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[5].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[6].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[7].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[8].id },
      },
    },
    {
      eventGameCategory: {
        connect: { id: eventGameCategoryData[4].id },
      },
      game: {
        connect: { id: gameData[9].id },
      },
    },
  ]
  for (const eventGame of eventGameData) {
    await prisma.eventGame.create({
      data: eventGame,
    })
  }

  // create invitation
  for (const player of playerData) {
    const playerInvitation: Prisma.EventPlayerInvitationCreateInput = {
      event: {
        connect: { id: eventData[0].id },
      },
      player: {
        connect: { id: player.id },
      },
      invitedByUser: {
        connect: { id: userData[0].id },
      },
    }
    await prisma.eventPlayerInvitation.create({
      data: playerInvitation,
    })
    const eventPlayerParticipation: Prisma.EventPlayerParticipationCreateInput = {
      event: {
        connect: { id: eventData[0].id },
      },
      player: {
        connect: { id: player.id },
      },
    }
    await prisma.eventPlayerParticipation.create({
      data: eventPlayerParticipation,
    })
  }
  const roundData: Prisma.RoundCreateInput[] = [
    {
      id: ulid(),
      event: {
        connect: { id: eventData[0].id },
      },
      phase: 'SETUP',
    },
  ]

  for (const round of roundData) {
    await prisma.round.create({
      data: round,
    })
  }

  const matchData: Prisma.MatchCreateInput[] = [
    {
      id: ulid(),
      round: {
        connect: {
          id: roundData[0].id,
        },
      },
      eventGame: {
        connect: {
          eventGameCategoryId_gameId: {
            gameId: gameData[0].id,
            eventGameCategoryId: eventGameCategoryData[0].id,
          },
        },
      },
    },
    {
      id: ulid(),
      round: {
        connect: {
          id: roundData[0].id,
        },
      },
      eventGame: {
        connect: {
          eventGameCategoryId_gameId: {
            gameId: gameData[1].id,
            eventGameCategoryId: eventGameCategoryData[1].id,
          },
        },
      },
    },
  ]

  for (const match of matchData) {
    await prisma.match.create({
      data: match,
    })
  }
  

  const teamData: Prisma.TeamCreateInput[] = [
    {
      id: ulid(),
      name: 'Team Fancy Pants',
      event: {
        connect: { id: eventData[0].id },
      },
      eventPlayers: {
        connect: [
          { eventId_playerId: { playerId: playerData[0].id, eventId: eventData[0].id } },
          { eventId_playerId: { playerId: playerData[1].id, eventId: eventData[0].id } },
          { eventId_playerId: { playerId: playerData[2].id, eventId: eventData[0].id } },
          { eventId_playerId: { playerId: playerData[3].id, eventId: eventData[0].id } },
        ],
      },
    },
  ]
  for (const team of teamData) {
    await prisma.team.create({
      data: team,
    })
  }
  const eventMatchPlayerSlotData: Prisma.EventMatchPlayerSlotCreateInput[] = [
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[0].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[0].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[1].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[0].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[2].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[0].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[3].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[0].id,
        },
      },
    },

    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[4].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[1].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[5].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[1].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[6].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[1].id,
        },
      },
    },
    {
      id: ulid(),
      eventPlayerParticipation: {
        connect: {
          eventId_playerId: { playerId: playerData[7].id, eventId: eventData[0].id },
        },
      },
      match: {
        connect: {
          id: matchData[1].id,
        },
      },
    },
  ]

  for (const eventMatchPlayerSlot of eventMatchPlayerSlotData) {
    await prisma.eventMatchPlayerSlot.create({
      data: eventMatchPlayerSlot,
    })
  }

  const playerSlotScoreData: Prisma.PlayerSlotScoreCreateInput[] = [
    {
      id: ulid(),
      eventMatchPlayerSlot: {
        connect: {
          id: eventMatchPlayerSlotData[0].id,
        },
      },
      score: 10,
      isWinningScore: false,
      medal: 'NONE',
    },
    {
      id: ulid(),
      eventMatchPlayerSlot: {
        connect: {
          id: eventMatchPlayerSlotData[1].id,
        },
      },
      score: 20,
      isWinningScore: false,
      medal: 'BRONZE',
    },
    {
      id: ulid(),
      eventMatchPlayerSlot: {
        connect: {
          id: eventMatchPlayerSlotData[2].id,
        },
      },
      score: 30,
      isWinningScore: false,
      medal: 'SILVER',
    },
    {
      id: ulid(),
      eventMatchPlayerSlot: {
        connect: {
          id: eventMatchPlayerSlotData[3].id,
        },
      },
      score: 40,
      isWinningScore: true,
      medal: 'GOLD',
    },
  ]

  for (const playerSlotScore of playerSlotScoreData) {
    await prisma.playerSlotScore.create({
      data: playerSlotScore,
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
