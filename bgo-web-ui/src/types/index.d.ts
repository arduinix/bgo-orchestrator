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
    fname: string
    lname: string
    email: string
    phone: string
    gender: string
    age: number
    isPlaying: boolean
    score: number
  }
}
export {}
