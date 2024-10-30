declare global {
  export interface Contact {
    name: string
    subject: string
    email: string
    message: string
  }

  export interface Ecosystem {
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

  export interface ListEvent {
    id: string
    name: string
    location: string
    createdDate: string
    playedDate?: string | null
    imagePath?: string | null
  }

  export interface Player {
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

  export interface PlayerExtensions {
    fullName: string
  }
  export type ExtendedPlayer = Player & PlayerExtensions

  export interface GameCategory {
    id: string
    name: string
    description: string
    totalGames: number
    isInPlay: boolean
    categoryColor?: CategoryColor
  }

  export interface CategoryColor {
    name: string
    hex: string
  }

  export interface Game {
    id: string
    name: string
    description: string
    category: string
    isInPlay: boolean
    minPlayers: number
    maxPlayers: number
    lowScoreWins: boolean
    addedDate: string
    averageCompletionMinutes?: number
    imagePath?: string
  }
  export interface GameExtensions {
    playerScaleDisplayNode: React.ReactNode
    scoreMethodDisplayNode: React.ReactNode
  }
  export type ExtendedGame = Game & GameExtensions

  interface ScoreElement {
    playerId: string
    score: number
  }

  interface RoundGameElement {
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

  export interface Round {
    id: string
    playerIdsInPlay: string[]
    categoryIdsInPlay: string[]
    gameIdsInPlay: string[]
    phase: 'setup' | 'inProgress' | 'complete' // this status should change when a new round is started by the game master
    createdTimestamp: string
    startedTimestamp?: string
    completedTimestamp?: string
    removedTimestamp?: string
    gamePlayElements: RoundGamePlayElement[] // one for each game
  }
}

export {}
