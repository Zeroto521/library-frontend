import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`
export { ALL_AUTHORS }
