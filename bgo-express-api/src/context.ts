import { BooksDataSource } from './datasources.js'
import { PrismaClient } from '@prisma/client'

export interface Contexts {
  dataSources: {
    booksAPI: BooksDataSource
    // eventsAPI: EventsDataSource
    bgoPrisma: PrismaClient
  }
}

export const dataSources = {
  booksAPI: new BooksDataSource(),
//   eventsAPI: new EventsDataSource(),
  bgoPrisma: new PrismaClient(),
}
