export interface MessageResponse {
  id: string
  message: string
  timestamp: string
}

export interface EventRecord {
  pk: string
  sk: string
  name: string
  location: string
  createdTimestamp: string
  playedTimestamp?: string
  imagePath?: string
}