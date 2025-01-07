import { BooksDataSource } from './datasources.js'
import { PrismaClient } from '@prisma/client'
import { Logger } from 'winston'
import { UserInterface} from '@types'

export interface Contexts {
  dataSources: {
    booksAPI: BooksDataSource
    // eventsAPI: EventsDataSource
    bgoPrisma: PrismaClient
  },
  logger: Logger
}

export const dataSources = {
  booksAPI: new BooksDataSource(),
//   eventsAPI: new EventsDataSource(),
  bgoPrisma: new PrismaClient(),
}
