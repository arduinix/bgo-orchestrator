import { gql } from 'urql'

export const getMessageQuery = gql`
  query {
    getMessage {
      id
      message
      timestamp
    }
  }
`
