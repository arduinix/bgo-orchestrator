export interface ReadEventInput {
  input: {
    id: string
  }
}

export interface Event {
  id: string
  eventName: string
  eventLocation: string
  createdTimestamp: string
  playedTimestamp?: string
  imagePath?: string
}
