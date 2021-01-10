import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_AUTHORS } from '../queries'

const Author = ({ author }) => (
  <tr>
    <td>{author.name}</td>
    <td>{author.born}</td>
    <td>{author.bookCount}</td>
  </tr>
)


const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {
            authors.map(author =>
              <Author key={author.id} author={author} />
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Authors
