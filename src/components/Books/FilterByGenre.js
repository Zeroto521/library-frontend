import React from 'react'

const FilterByGenre = ({ genres, setFilterGenre }) => (
  <div>
    {
      genres.map(genre =>
        <button key={genre} onClick={() => setFilterGenre(genre)}>{genre}</button>
      )
    }
  </div>
)

export default FilterByGenre
