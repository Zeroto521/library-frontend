import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useField } from '../hooks.js'

const NewBook = ({ show, notifyWith }) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      notifyWith(error.message)
    }
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      }
    })

    title.reset()
    author.reset()
    published.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>title <input {...title.form} /></div>
        <div>author <input {...author.form} /></div>
        <div>published <input {...published.form} /></div>
        <div>
          <input {...genre.form} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
