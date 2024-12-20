import { PrismaClient, Prisma } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

const eventData: Prisma.EventCreateInput[] = [
    // loop to generate 5 events

  {
    id: ulid(),
    name: 'Event 1',
    description: 'Event 1 Description',
    location: 'Denver, CO',
  },
  {
    id: ulid(),
    name: 'Event 2',
    description: 'Event 2 Description',
    location: 'New York, NY',
  },
  {
    id: ulid(),
    name: 'Event 3',
    description: 'Event 3 Description',
    location: 'San Francisco, CA',
  },
  {
    id: ulid(),
    name: 'Event 4',
    description: 'Event 4 Description',
    location: 'Chicago, IL',
  },
  {
    id: ulid(),
    name: 'Event 5',
    description: 'Event 5 Description',
    location: 'Austin, TX',
  },
  {
    id: ulid(),
    name: 'Event 6',
    description: 'Event 6 Description',
    location: 'Pittsburgh, PA',
  },
]

async function main() {
  console.log('Start seeding...')

  for (const event of eventData) {
    const eventRecord = await prisma.event.create({
      data: event,
    })
    console.log(`Created event with id: ${eventRecord.id}`)
  }

  console.log('Seeding complete.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
