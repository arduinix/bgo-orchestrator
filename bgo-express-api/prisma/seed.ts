import { PrismaClient, Prisma } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

const eventData: Prisma.EventCreateInput[] = [
  {
    id: ulid(),
    name: 'Event 1',
    description: 'Event 1 Description',
    location: 'Denver, CO',
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
