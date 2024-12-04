import { ReactNode } from 'react'
import { OlympicMedalType } from '@/enums/enums'
declare global {
  interface Contact {
    name: string
    subject: string
    email: string
    message: string
  }

  interface Event {
    id: string
    name: string
    location: string
    createdTimestamp: string
    playedTimestamp?: string
    imagePath?: string
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
    isCheckedIn: boolean
    score: number
    imagePath?: string
    inviteTimestamp?: string
    inviteAcceptedTimestamp?: string
  }

  interface ExtendedPlayer extends Player {
    fullName: string
    isPlayingToggleNode?: ReactNode
    inviteStatusNode?: ReactNode
    checkedInNode?: ReactNode
    playingNode?: ReactNode
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
    awardedMedal?: OlympicMedalType
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
    gameNameNode: ReactNode
    phaseBadgeNode: ReactNode
    playersNode: ReactNode
    scoresNode: ReactNode
    matchActionsNode?: ReactNode
    playersSearchField?: string
  }

  type RoundPhase = 'setup' | 'ready' | 'playing' | 'complete'
  interface Round {
    id: string
    selectedCategoryId?: string
    phase: RoundPhase // this status should change when a new round is started by the game master
    createdTimestamp: string
    startedTimestamp?: string
    completedTimestamp?: string
    removedTimestamp?: string
    roundGameIds: string[] // this will be a string list of ids of the round games, change this to a list of (match) ids.
    roundNumber: number
  }
}
export {}
