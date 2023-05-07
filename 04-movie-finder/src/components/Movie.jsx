import React from 'react';

const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map(({ id, title, year, poster }) => (
        <li className="movie" key={id}>
          <img className="poster" src={poster} alt={title} />
          <h3>{title}</h3>
          <p>{year}</p>
        </li>
      ))}
    </ul>
  );
};

const EmptyListOFMovies = () => {
  return <p>No se encontraron resultados para esta búsqueda</p>;
};

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <EmptyListOFMovies />;
}
