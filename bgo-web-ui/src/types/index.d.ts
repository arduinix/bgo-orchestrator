import { ReactNode } from 'react'
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
    isPlayingToggleNode?: ReactNode
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
    playerScaleDisplayNode?: ReactNode
    scoreMethodDisplayNode?: ReactNode
    tableAssignmentDisplayNode: ReactNode
    isInPlayToggleNode?: ReactNode
  }

  interface ScoreElement {
    recordedTimestamp: string
    score: number
    tieBreaker?: number // TODO: we need to determine what we are going to determine how we manage ties and tie breakers
    isWinner?: boolean
    lowScoreWins: boolean
  }
  interface PlayerMatchScore {
    id: string
    playerId: string
    playerName: string
    scoreElement?: ScoreElement
  }

  interface Match {
    id: string
    roundId: string
    game: { id: string; name: string }
    categoryId: string
    lowScoreWins: boolean
    phase: 'incomplete' | 'complete'
    createdTimestamp: string
    startedTimestamp?: string
    completedTimestamp?: string
    removedTimestamp?: string // will show the time that the match was removed if desired
    playerMatchScores: PlayerMatchScore[]
  }

  interface ExtendedMatch extends Match {
    gameName: string
    phaseBadgeNode: ReactNode
    playersNode: ReactNode
    scoresNode: ReactNode
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
}

export {}
