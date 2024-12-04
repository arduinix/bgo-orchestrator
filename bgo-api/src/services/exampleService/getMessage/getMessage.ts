import { helloExample } from 'lib/helloExample'
import { MessageResponse } from 'types'
import { ulid } from 'ulid'

export async function handler(): Promise<MessageResponse> {
  console.log('Retrieving message...')

  return {
    id: ulid(),
    message: helloExample().message,
    timestamp: new Date().toISOString(),
  }
}  