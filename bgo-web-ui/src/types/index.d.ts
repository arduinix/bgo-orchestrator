declare global {
  interface Contact {
    name: string
    subject: string
    email: string
    message: string
  }

  interface Ecosystem {
    id: string
    name: string
    description: string
    totalAcres: number
    landOwner: string
    outerEntity: string
    county: string
    state: string
    country: string
    latitudeCenter: number
    longitudeCenter: number
    elevation: number
    createdDate: string
    fTotalImages: number
    fIdentifiedSpecies: number
  }

  interface ListEvent {
    id: string
    name: string
    location: string
    createdDate: string
    playedDate?: string | null
    imagePath?: string | null
  }

  interface Player {
    id: string
    fName: string
    mInit: string | null
    lName: string
    nickName?: string
    email: string
    phone: string
    gender: string
    age: number
    isPlaying: boolean
    score: number
    imagePath?: string
  }

  interface ExtendedPlayer extends Player {
    fullName: string
  }

  interface GameCategory {
    id: string
    name: string
    description: string
    totalGames: number
    isInPlay: boolean
    categoryColor?: CategoryColor
  }

  interface CategoryColor {
    name: string
    hex: string
  }

  interface Game {
    id: string
    name: string
    description: string
    category: string
    isInPlay: boolean
    minPlayers: number
    maxPlayers: number
    lowScoreWins: boolean
    tableAssignment?: number
    addedDate: string
    averageCompletionMinutes?: number
    imagePath?: string
  }
  interface ExtendedGame extends Game {
    playerScaleDisplayNode: React.ReactNode
    scoreMethodDisplayNode: React.ReactNode
    tableAssignmentDisplayNode: React.ReactNode
  }

  interface ScoreElement {
    playerId: string
    score: number
  }

  interface RoundGame {
    id: string
    roundId: string
    gameId: string
    categoryId: string
    playerIds: string[]
    lowScoreWins: boolean
    phase: 'incomplete' | 'complete'
    createdTimestamp: string
    startedTimestamp?: string
    completedTimestamp?: string
    removedTimestamp?: string
    scores: ScoreElement[]
  }

  interface Round {
    id: string
    selectedCategoryId?: string
    phase: 'setup' | 'ready' | 'playing' | 'complete' // this status should change when a new round is started by the game master
    createdTimestamp: string
    startedTimestamp?: string
    completedTimestamp?: string
    removedTimestamp?: string
    roundGameIds: string[] // this will be a string list of ids of the round games
    roundNumber: number
  }
  // interface SortedRound extends Round {
  //   roundNumber: number
  // }
}

export {}
