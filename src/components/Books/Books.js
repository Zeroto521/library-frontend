import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { ALL_BOOKS } from '../../queries'
import Book from './Book'
import FilterByGenre from './FilterByGenre'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [filterGenre, setFilterGenre] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  if (filterGenre) {
    books = books.filter(b => b.genres.includes(filterGenre))
  }
  let genres = Array.prototype.concat.apply([], books.map(b => b.genres))
  genres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.map(book =>
              <Book key={book.title} book={book} />
            )
          }
        </tbody>
      </table>
      <FilterByGenre genres={genres} setFilterGenre={setFilterGenre} />
    </div>
  )
}

export default Books
