export const searchMovies = async ({ search }) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=1e68a876&s=${search}`);
  const { Search: movies } = await res.json();
  return movies ? mapMovies(movies) : [];
};

export const sortMoviesByTitle = (movies) => {
  return [...movies].sort((a, b) => a.title.localeCompare(b.title));
};

const mapMovies = (movies) => {
  return movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    type: movie.Type,
    year: movie.Year,
    poster: movie.Poster
  }));
};
