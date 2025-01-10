import { BooksDataSource } from './datasources.js'
import { PrismaClient } from '@prisma/client'
import { Logger } from 'winston'
import { JwtPayload } from 'jsonwebtoken'

// import { AuthenticatedUser } from './types'

export interface Contexts {
  dataSources: {
    booksAPI: BooksDataSource
    // eventsAPI: EventsDataSource
    bgoPrisma: PrismaClient
  }
  logger: Logger
  user: JwtPayload
}

export const dataSources = {
  booksAPI: new BooksDataSource(),
  //   eventsAPI: new EventsDataSource(),
  bgoPrisma: new PrismaClient(),
}
