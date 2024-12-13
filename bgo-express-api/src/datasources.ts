// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import {
  AddBookMutationResponse,
  Book,
  CreateEventInput,
  Event,
  CreateEventMutationResponse,
  ReadEventInput,
  UpdateEventInput,
} from './__generated__/resolvers-types'
import { ulid } from 'ulid'

const BooksDB: Omit<Required<Book>, '__typename'>[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

export class BooksDataSource {
  getBooks(): Book[] {
    // simulate fetching a list of books
    return BooksDB
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addBook(book: Book): Promise<AddBookMutationResponse> {
    if (book.title && book.author) {
      BooksDB.push({ title: book.title, author: book.author })

      return {
        code: '200',
        success: true,
        message: 'New book added!',
        book,
      }
    } else {
      return {
        code: '400',
        success: false,
        message: 'Invalid input',
        book: null,
      }
    }
  }
}

const EventsDB: Omit<Event, '__typename'>[] = [
  {
    id: '01JEW8G6WKMRAFGVXE9PJQF5Z9',
    createdTimestamp: '2024-12-12T01:42:27.987Z',
    description: 'An updated event',
    eventDate: '2021-10-01',
    eventLocation: 'Mars',
    eventName: 'Another update to the event',
    updatedTimestamp: '2024-12-12T15:26:35.854Z',
  },
]

export class EventsDataSource {
  listEvents(): Event[] {
    // simulate fetching a list of events
    return EventsDB
  }
  readEvent(input: ReadEventInput): Event | null {
    return EventsDB.find((event) => event.id === input.id) || null
  }

  updateEvent(input: UpdateEventInput): Event | null {
    const eventIndex = EventsDB.findIndex((event) => event.id === input.id)

    if (eventIndex === -1) {
      return null
    }

    EventsDB[eventIndex] = {
      ...EventsDB[eventIndex],
      ...input,
      updatedTimestamp: new Date().toISOString(),
    }

    return EventsDB[eventIndex]
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async createEvent(input: CreateEventInput): Promise<CreateEventMutationResponse> {
    const event: Event = {
      ...input,
      id: ulid(),
      createdTimestamp: new Date().toISOString(),
      updatedTimestamp: new Date().toISOString(),
    }

    EventsDB.push(event)

    return {
      code: '200',
      success: true,
      message: 'New event created!',
      event,
    }
  }
}
