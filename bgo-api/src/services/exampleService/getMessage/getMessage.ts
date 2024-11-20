import { helloExample } from 'lib/helloExample'
import { MessageResponse } from 'types'
import KSUID from 'ksuid'

export async function handler(): Promise<MessageResponse> {
  console.log('Retrieving message...')

  return {
    id: KSUID.randomSync().string,
    message: helloExample().message,
    timestamp: new Date().toISOString(),
  }
}  