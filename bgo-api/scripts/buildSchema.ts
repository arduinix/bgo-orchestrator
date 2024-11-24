// This is an experimental script to combine multiple GraphQL schema files into a single schema file. We will probably just use something like graphql code gen instead

import fs from 'fs'
import path from 'path'
import { buildSchema, validateSchema } from 'graphql'

try {
  const schemasDir: string = path.join(__dirname, '../', 'src', 'schema')
  const outputFile: string = path.join(
    __dirname,
    '../',
    'out',
    'schema.graphql'
  )

  fs.mkdirSync(path.dirname(outputFile), { recursive: true })

  const files: string[] = fs
    .readdirSync(schemasDir)
    .filter((file: string) => file.endsWith('.graphql'))

  let queryFields = ''
  let mutationFields = ''
  let otherTypeDefs = ''

  files.forEach((file: string) => {
    const filePath = path.join(schemasDir, file)
    const schemaContent = fs.readFileSync(filePath, 'utf8')

    let insideQuery = false
    let insideMutation = false

    schemaContent.split('\n').forEach((line) => {
      if (line.startsWith('type Query {')) {
        insideQuery = true
      } else if (line.startsWith('type Mutation {')) {
        insideMutation = true
      } else if (insideQuery && line.startsWith('}')) {
        insideQuery = false
      } else if (insideMutation && line.startsWith('}')) {
        insideMutation = false
      } else if (insideQuery) {
        queryFields += line + '\n'
      } else if (insideMutation) {
        mutationFields += line + '\n'
      } else {
        otherTypeDefs += line + '\n'
      }
    })
  })

  let combinedSchema = ''

  if (queryFields.trim()) {
    combinedSchema += `
      type Query {
        ${queryFields}
      }
    `
  }

  if (mutationFields.trim()) {
    combinedSchema += `
      type Mutation {
        ${mutationFields}
      }
    `
  }

  combinedSchema += otherTypeDefs

  const schema = buildSchema(combinedSchema)
  const errors = validateSchema(schema)

  if (errors.length > 0) {
    throw new Error(`Schema validation errors:\n${errors.join('\n')}`)
  }

  fs.writeFileSync(outputFile, combinedSchema)
  console.log(`Schema combined successfully into: ${outputFile}`)
} catch (err) {
  console.error(
    'Error combining schemas:',
    err instanceof Error ? err.message : err
  )
}
